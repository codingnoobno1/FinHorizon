import cv2
import os
import time

# Constants
MAX_IMAGES = 50
FRAME_INTERVAL = 10  
SAVE_PATH = "dataset"  # Change this to your dataset path

def detect_face(frame):
    """Detect faces and return the largest bounding box (x, y, w, h)"""
    face_cascade_path = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    if not os.path.exists(face_cascade_path):
        print("❌ Haarcascade file not found! Check OpenCV installation.")
        return None
    
    face_cascade = cv2.CascadeClassifier(face_cascade_path)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(50, 50))

    if len(faces) == 0:
        return None
    
    # Return the largest face detected (better accuracy)
    faces = sorted(faces, key=lambda f: f[2] * f[3], reverse=True)
    return faces[0]

def capture_images():
    """Captures frames, detects faces, and saves images with YOLO labels."""
    
    # Get user details
    name = input("Enter your name: ").strip()
    age = input("Enter your age: ").strip()
    
    user_folder = f"{name}_{age}"
    image_path = os.path.join(SAVE_PATH, "images", user_folder)
    label_path = os.path.join(SAVE_PATH, "labels", user_folder)

    os.makedirs(image_path, exist_ok=True)
    os.makedirs(label_path, exist_ok=True)

    # Initialize Camera
    cap = cv2.VideoCapture(0)
    start_time = time.time()
    
    while not cap.isOpened():
        if time.time() - start_time > 5:  # 5 seconds timeout
            print("❌ Camera not found! Exiting...")
            return
    
    count = 0
    saved_count = 0

    print("🎥 Press 'Q' to stop recording...")

    while saved_count < MAX_IMAGES:
        ret, frame = cap.read()
        if not ret:
            print("❌ Failed to capture frame!")
            break

        face = detect_face(frame)
        if face is not None:
            x, y, w, h = face
            
            # Draw a rectangle for visualization
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

            if count % FRAME_INTERVAL == 0:
                # Convert to YOLO format (normalized values)
                img_h, img_w, _ = frame.shape
                x_center = (x + w / 2) / img_w
                y_center = (y + h / 2) / img_h
                width = w / img_w
                height = h / img_h

                # Save Image
                img_name = f"{name}_{age}_{saved_count}.jpg"
                img_path = os.path.join(image_path, img_name)
                cv2.imwrite(img_path, frame)

                # Save Label (YOLO format)
                label_name = f"{name}_{age}_{saved_count}.txt"
                label_path_file = os.path.join(label_path, label_name)
                with open(label_path_file, "w") as f:
                    # "0" is the class id for face, followed by the normalized center and size
                    f.write(f"0 {x_center:.6f} {y_center:.6f} {width:.6f} {height:.6f}\n")

                print(f"✅ Saved: {img_name} with label")

                saved_count += 1

        # Show frame
        cv2.imshow("Face Capture", frame)
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q') or key == 27:
            break

        count += 1

    cap.release()
    cv2.destroyAllWindows()
    print(f"✅ Dataset capture complete for {name}, Age: {age}")

# Run the function
capture_images()
