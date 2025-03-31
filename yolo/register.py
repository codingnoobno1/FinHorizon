import os
import sqlite3
import json
import cam
import face
import modeltrain
import time
import glob  # ✅ Faster file counting

# ✅ Directories & Database
DATASET_DIR = "dataset/images/train/"
DB_DIR = "database"
DB_FILE = os.path.join(DB_DIR, "users.db")
JSON_FILE = os.path.join(DB_DIR, "users.json")

# ✅ Ensure database directory exists
os.makedirs(DB_DIR, exist_ok=True)

# ✅ Initialize Database
def init_db():
    """Creates the database table if it doesn't exist."""
    try:
        with sqlite3.connect(DB_FILE) as conn:
            cursor = conn.cursor()
            cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                name TEXT NOT NULL,
                                age INTEGER NOT NULL,
                                images TEXT NOT NULL)''')
            conn.commit()
        print("✅ Database initialized successfully.")
    except sqlite3.Error as e:
        print(f"❌ Database Error: {e}")

# ✅ Save user data to SQLite
def save_to_db(name, age, images):
    """Saves user details and image paths to SQLite."""
    try:
        with sqlite3.connect(DB_FILE) as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO users (name, age, images) VALUES (?, ?, ?)",
                           (name, age, json.dumps(images)))
            conn.commit()
        print(f"✅ User {name} saved in database.")
        return True
    except sqlite3.Error as e:
        print(f"❌ Database Error: {e}")
        return False

# ✅ Save user data to JSON file
def save_to_json(name, age, images):
    """Saves user data to JSON file."""
    try:
        users = []
        if os.path.exists(JSON_FILE):
            with open(JSON_FILE, "r") as f:
                try:
                    users = json.load(f)
                except json.JSONDecodeError:
                    print("❌ JSON file corrupted, resetting...")
                    users = []

        users.append({"name": name, "age": age, "images": images})

        with open(JSON_FILE, "w") as f:
            json.dump(users, f, indent=4)

        print(f"✅ User {name} saved in JSON.")
    except Exception as e:
        print(f"❌ JSON Save Error: {e}")

# ✅ Capture and register a new face
def register_face():
    """Registers a new user, saves images, and trains the model after 100 images."""
    name = input("Enter your name: ").strip().lower()
    age = input("Enter your age: ").strip()

    # ✅ Validate name & age
    if not name.replace(" ", "").isalpha():
        print("❌ Invalid name! Only alphabets allowed.")
        return
    if not age.isdigit():
        print("❌ Invalid age! Only numbers allowed.")
        return
    age = int(age)

    user_dir = os.path.join(DATASET_DIR, f"{name}_{age}")
    os.makedirs(user_dir, exist_ok=True)

    print(f"\n[INFO] Registering user: {name}, Age: {age}")
    print(f"[INFO] Saving images to: {user_dir}")

    frames = cam.capture_images()  # ✅ Capture images from camera

    if not frames or len(frames) == 0:
        print("❌ No frames captured! Check camera.")
        return

    cropped_faces = []

    for i, frame in enumerate(frames):
        detected_faces = face.detect_face(frame)  # ✅ Detect face(s)
        
        if not detected_faces:
            print(f"❌ No face detected in frame {i}. Skipping...")
            continue

        for j, cropped_face in enumerate(detected_faces):
            face_path = os.path.join(user_dir, f"face_{time.time():.0f}.jpg")  # ✅ Unique name
            try:
                face.save_face(face_path, cropped_face)  # ✅ Save detected face
                cropped_faces.append(face_path)
                print(f"✅ Face saved: {face_path}")
            except Exception as e:
                print(f"❌ Error saving face: {e}")

    if cropped_faces:
        if save_to_db(name, age, cropped_faces):  # ✅ Store in SQLite
            save_to_json(name, age, cropped_faces)  # ✅ Store in JSON (optional)
    else:
        print("❌ No valid faces detected! Try again.")
        return

    print(f"\n✅ Registration complete! {len(cropped_faces)} faces saved.\n")

    # ✅ Train model if at least 100 images exist in dataset
    total_images = len(glob.glob(os.path.join(DATASET_DIR, "**/*.jpg"), recursive=True))
    if total_images >= 100:
        print("\n🚀 100+ images saved! Training model...")
        modeltrain.train_model()  # ✅ Trigger training

if __name__ == "__main__":
    init_db()  # ✅ Ensure DB is initialized
    register_face()
