import cv2
import os
from ultralytics import YOLO

MODEL_PATH = "models/yolov8n-face.pt"
face_detector = YOLO(MODEL_PATH)

def detect_face(frame):
    """
    Detects faces in a given frame and returns cropped images.
    """
    if frame is None:
        print("❌ Invalid frame received!")
        return []

    results = face_detector(frame)
    cropped_faces = []

    for result in results:
        for box in result.boxes.xyxy:
            x1, y1, x2, y2 = map(int, box)
            cropped_faces.append(frame[y1:y2, x1:x2])

    if not cropped_faces:
        print("⚠️ No face detected in the frame.")

    return cropped_faces

def save_face(path, face_image):
    """
    Saves a cropped face image to the given path.
    """
    if face_image is None or face_image.size == 0:
        print("⚠️ Empty face image! Skipping save.")
        return
    
    cv2.imwrite(path, face_image)
    print(f"✅ Face saved: {path}")
