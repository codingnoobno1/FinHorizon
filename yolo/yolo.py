import os
import cv2
import random
import shutil
import torch
from ultralytics import YOLO

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_DIR = os.path.join(BASE_DIR, "registered_faces")
IMAGES_DIR = os.path.join(DATASET_DIR, "images")
LABELS_DIR = os.path.join(DATASET_DIR, "labels")
TRAIN_DIR = os.path.join(IMAGES_DIR, "train")
VAL_DIR = os.path.join(IMAGES_DIR, "val")
TRAIN_LABELS = os.path.join(LABELS_DIR, "train")
VAL_LABELS = os.path.join(LABELS_DIR, "val")
DATA_YAML = os.path.join(BASE_DIR, "data.yaml")
MODEL_PATH = "yolov8n.pt"
TRAINED_MODEL = os.path.join(BASE_DIR, "runs/detect/train/weights/best.pt")

# Ensure required folders exist
for folder in [DATASET_DIR, IMAGES_DIR, LABELS_DIR, TRAIN_DIR, VAL_DIR, TRAIN_LABELS, VAL_LABELS]:
    os.makedirs(folder, exist_ok=True)

# Load YOLO model for face detection
face_detector = YOLO("yolov8n-face.pt")  # Pre-trained face detection model

# Function to create data.yaml automatically
def create_data_yaml():
    yaml_content = f"""path: {DATASET_DIR}
train: images/train
val: images/val
nc: 1
names: ['face']
"""
    with open(DATA_YAML, "w") as f:
        f.write(yaml_content)
    print(f"✅ Created {DATA_YAML}")

# Function to split dataset into train and val
def split_data():
    try:
        for user in os.listdir(TRAIN_DIR):
            user_path = os.path.join(TRAIN_DIR, user)
            val_user_path = os.path.join(VAL_DIR, user)
            os.makedirs(val_user_path, exist_ok=True)
            
            if os.path.isdir(user_path):
                images = [img for img in os.listdir(user_path) if img.endswith(".jpg")]
                random.shuffle(images)
                val_count = int(len(images) * 0.2)

                for img in images[:val_count]:
                    shutil.move(os.path.join(user_path, img), os.path.join(val_user_path, img))

        print(f"✅ Data split: {len(os.listdir(VAL_DIR))} users moved to validation set.")
    except Exception as e:
        print(f"❌ Error in data splitting: {e}")

# Function to register a new face
def register():
    try:
        name = input("\nEnter your Name: ").strip().replace(" ", "_")
        age = input("Enter your Age: ").strip()
        
        if not name or not age.isdigit():
            print("❌ Invalid input. Please enter a valid name and numeric age.")
            return

        user_folder = os.path.join(TRAIN_DIR, f"{name}_{age}")
        os.makedirs(user_folder, exist_ok=True)

        print("\n🎥 Capturing video... Press 'q' to stop recording")

        cap = cv2.VideoCapture(0)
        if not cap.isOpened():
            print("❌ Error: Camera not found!")
            return
        
        count = 0
        max_images = 150  # Limit number of images

        while cap.isOpened() and count < max_images:
            ret, frame = cap.read()
            if not ret:
                print("❌ Error: Unable to capture frame.")
                break
            
            # Detect faces in real time
            results = face_detector.predict(frame)
            for result in results:
                for box in result.boxes.xyxy:
                    x1, y1, x2, y2 = map(int, box)
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

            cv2.imshow("Face Capture - Press 'q' to Exit", frame)

            if count % 5 == 0:  # Save every 5th frame
                image_path = os.path.join(user_folder, f"face_{count}.jpg")
                cv2.imwrite(image_path, frame)
                print(f"✅ Saved: {image_path}")

            count += 1
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()
        print(f"\n✅ Face data saved for {name}. Preparing dataset...")

        create_data_yaml()
        split_data()
        train_yolo()
    
    except Exception as e:
        print(f"❌ Error: {e}")
    
    finally:
        cap.release()
        cv2.destroyAllWindows()

# Function to train YOLO on the new dataset
def train_yolo():
    try:
        print("\n🚀 Training YOLOv8 on registered faces...")
        
        if not os.listdir(TRAIN_DIR) or not os.listdir(VAL_DIR):
            print("❌ Not enough images to train. Register more faces first!")
            return

        device = "cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"
        print(f"✅ Using device: {device}")

        model = YOLO(MODEL_PATH)
        model.train(
            data=DATA_YAML, 
            epochs=50, 
            imgsz=640, 
            batch=16, 
            patience=10, 
            device=device
        )
        
        print("\n✅ Training complete! Best model saved at:", TRAINED_MODEL)
    
    except Exception as e:
        print(f"❌ Error during training: {e}")

# Main execution
if __name__ == "__main__":
    register()
