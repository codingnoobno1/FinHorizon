import time
from fingerdb import insert_user

def register_fingerprint(name, arduino):
    print(f"📝 Registering fingerprint for {name}...")

    arduino.write(b'R')  # Send 'Register' command
    fingerprint_id = None

    while True:
        if arduino.in_waiting:
            line = arduino.readline().decode().strip()
            print(f"🔹 {line}")  # Debug: Display Arduino response

            if "ID:" in line:
                fingerprint_id = int(line.split(":")[1].strip())
                break

    if fingerprint_id:
        insert_user(name, fingerprint_id)
    else:
        print("❌ Registration failed. No ID received.")
