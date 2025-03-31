import os
import shutil
import yaml
import random
import torch
import cv2
from ultralytics import YOLO
import logging

# ✅ Paths & Parameters
PROJECT_DIR = r"D:\New folder (3)\yolo"
DATASET_DIR = os.path.join(PROJECT_DIR, "dataset")
TRAIN_DIR = os.path.join(DATASET_DIR, "images", "train")
VAL_DIR = os.path.join(DATASET_DIR, "images", "val")
LABELS_DIR = os.path.join(DATASET_DIR, "labels")
MODEL_PATH = os.path.join(PROJECT_DIR, "models", "yolov8n-face.pt")
TRAINED_MODEL_DIR = os.path.join(PROJECT_DIR, "models")
RUNS_DIR = os.path.join(PROJECT_DIR, "runs", "train")

EPOCHS = 50
BATCH_SIZE = 16
IMG_SIZE = 640
PATIENCE = 10
VAL_SPLIT = 0.2  # % of training images moved to validation if empty

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ✅ Ensure required directories exist
os.makedirs(TRAIN_DIR, exist_ok=True)
os.makedirs(VAL_DIR, exist_ok=True)
os.makedirs(LABELS_DIR, exist_ok=True)
os.makedirs(TRAINED_MODEL_DIR, exist_ok=True)
os.makedirs(RUNS_DIR, exist_ok=True)

def count_images(directory):
    """Counts all image files inside subdirectories of a given directory."""
    total_images = 0
    for root, _, files in os.walk(directory):
        total_images += len([f for f in files if f.endswith(('.jpg', '.png', '.jpeg'))])
    return total_images

def move_train_to_val(user):
    """Move a portion of training images to validation if validation is empty."""
    user_train_dir = os.path.join(TRAIN_DIR, user)
    user_val_dir = os.path.join(VAL_DIR, user)
    os.makedirs(user_val_dir, exist_ok=True)

    train_images = [f for f in os.listdir(user_train_dir) if f.endswith(('.jpg', '.png', '.jpeg'))]
    if not train_images:
        logger.warning(f"No images in {user_train_dir}. Skipping {user}.")
        return False

    val_images = os.listdir(user_val_dir)
    if not val_images:
        num_to_move = int(len(train_images) * VAL_SPLIT)
        val_images = random.sample(train_images, num_to_move)

        for img in val_images:
            shutil.move(os.path.join(user_train_dir, img), os.path.join(user_val_dir, img))

        logger.info(f"Moved {num_to_move} images from train to val for {user}.")
    
    return True

def dataset_exists(user):
    """Check if user-specific train and val datasets exist with images."""
    user_train_dir = os.path.join(TRAIN_DIR, user)
    user_val_dir = os.path.join(VAL_DIR, user)

    train_count = count_images(user_train_dir)
    val_count = count_images(user_val_dir)

    if train_count == 0:
        logger.error(f"No training images found for {user}! Add images to '{user_train_dir}' before training.")
        return False
    if val_count == 0:
        logger.warning(f"No validation images found for {user}! Creating validation set automatically.")
        if not move_train_to_val(user):
            return False

    logger.info(f"{user}: Found {train_count} training images and {val_count} validation images.")
    return True

def get_users():
    """Returns a list of usernames from the train dataset directory."""
    users = [folder for folder in os.listdir(TRAIN_DIR) if os.path.isdir(os.path.join(TRAIN_DIR, folder))]
    if not users:
        logger.error("No user-specific directories found inside 'train'.")
    return users

def detect_face_and_generate_labels(user):
    """Detects faces in images and generates YOLO format labels."""
    user_train_dir = os.path.join(TRAIN_DIR, user)
    user_label_dir = os.path.join(LABELS_DIR, user)
    os.makedirs(user_label_dir, exist_ok=True)

    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

    train_images = [f for f in os.listdir(user_train_dir) if f.endswith(('.jpg', '.png', '.jpeg'))]
    if not train_images:
        logger.warning(f"No images found for {user}, skipping label generation.")
        return
    
    for img in train_images:
        img_path = os.path.join(user_train_dir, img)
        frame = cv2.imread(img_path)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(50, 50))

        label_file = os.path.splitext(img)[0] + ".txt"
        label_path = os.path.join(user_label_dir, label_file)

        with open(label_path, "w") as f:
            if len(faces) == 0:
                logger.warning(f"No face detected in {img}, skipping.")
                continue

            for (x, y, w, h) in faces:
                img_h, img_w, _ = frame.shape
                x_center = (x + w / 2) / img_w
                y_center = (y + h / 2) / img_h
                width = w / img_w
                height = h / img_h

                f.write(f"0 {x_center:.6f} {y_center:.6f} {width:.6f} {height:.6f}\n")

    logger.info(f"Face labels generated for {user} in {user_label_dir}")

def generate_data_yaml(user):
    """Creates a user-specific data.yaml file."""
    user_yaml_path = os.path.join(PROJECT_DIR, f"data_{user}.yaml")

    data_config = {
        "path": PROJECT_DIR,
        "train": os.path.join(TRAIN_DIR, user),
        "val": os.path.join(VAL_DIR, user),
        "nc": 1,  # Number of classes (each user is one class)
        "names": [user]  # Class names are the usernames
    }

    with open(user_yaml_path, "w") as f:
        yaml.dump(data_config, f, default_flow_style=False)

    return user_yaml_path

def get_latest_model_path():
    """Finds the latest trained YOLO model path."""
    exp_dirs = [d for d in os.listdir(RUNS_DIR) if d.startswith("exp")]
    if not exp_dirs:
        return None
    latest_exp = sorted(exp_dirs, key=lambda x: os.path.getctime(os.path.join(RUNS_DIR, x)), reverse=True)[0]
    return os.path.join(RUNS_DIR, latest_exp, "weights", "best.pt")

def train_model():
    """Trains a YOLO model for each user (username-based)."""
    users = get_users()
    if not users:
        return

    device = "cuda" if torch.cuda.is_available() else "cpu"

    for user in users:
        user_train_dir = os.path.join(TRAIN_DIR, user)
        user_val_dir = os.path.join(VAL_DIR, user)
        user_model_path = os.path.join(TRAINED_MODEL_DIR, f"{user}.pt")

        if not dataset_exists(user):
            continue  # Skip users with no valid dataset

        # ✅ Generate face labels dynamically
        detect_face_and_generate_labels(user)

        logger.info(f"\n🚀 Training model for user: {user} on {device.upper()}...\n")

        # ✅ Generate user-specific data.yaml
        user_yaml = generate_data_yaml(user)

        # ✅ Load YOLO model
        model = YOLO(MODEL_PATH)

        # ✅ Start Training
        model.train(
            data=user_yaml,
            epochs=EPOCHS,
            imgsz=IMG_SIZE,
            batch=BATCH_SIZE,
            patience=PATIENCE,
            device=device
        )

        # ✅ Locate and save the trained model
        trained_model_path = get_latest_model_path()
        if trained_model_path and os.path.exists(trained_model_path):
            shutil.copy(trained_model_path, user_model_path)
            logger.info(f"\n✅ Training complete! Model saved at: {user_model_path}")
        else:
            logger.error(f"\n❌ Training failed for {user}. No trained model found.")

if __name__ == "__main__":
    train_model()
