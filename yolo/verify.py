import cv2
import os
import time
from ultralytics import YOLO
import verify  # ✅ Importing verify module to capture face dynamically

# ✅ Model & Directories
MODEL_PATH = "models/yolov8n-face.pt"
DATASET_DIR = "dataset/images/train/"

# ✅ Ensure dataset directory exists
os.makedirs(DATASET_DIR, exist_ok=True)

def capture_images(name, age, num_images=10):
    """
    Captures face images using YOLO from verify.py and saves them with labels.
    :param name: User's name
    :param age: User's age
    :param num_images: Number of images to capture
    :return: List of saved image paths
    """
    face_detector = YOLO(MODEL_PATH)
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("❌ Camera not found!")
        return []

    user_dir = os.path.join(DATASET_DIR, f"{name}_{age}")
    os.makedirs(user_dir, exist_ok=True)

    saved_images = []
    print(f"📸 Capturing {num_images} face images for {name}, Age: {age}...")

    count = 0
    while count < num_images:
        ret, frame = cap.read()
        if not ret:
            continue

        results = face_detector(frame)

        for result in results:
            for box in result.boxes.xyxy:
                x1, y1, x2, y2 = map(int, box)
                detected_face = frame[y1:y2, x1:x2]

                # ✅ Capture only if verified by `verify.py`
                if verify.check_face(detected_face):  
                    filename = f"face_{time.time():.0f}.jpg"
                    save_path = os.path.join(user_dir, filename)
                    cv2.imwrite(save_path, detected_face)
                    saved_images.append(save_path)
                    count += 1
                    print(f"✅ Face saved: {save_path}")

        cv2.imshow("Capturing Faces", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    
    print(f"\n🎉 Captured {count} face images successfully!")
    return saved_images

# ✅ Prevents auto-execution when `cam.py` is imported
if __name__ == "__main__":
    name = input("Enter your name: ").strip().lower()
    age = input("Enter your age: ").strip()
    
    if not name.isalpha() or not age.isdigit():
        print("❌ Invalid name or age!")
    else:
        capture_images(name, int(age))
