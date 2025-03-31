import time
from fingerdb import get_user_by_fingerprint

def verify_fingerprint(arduino):
    print("🔍 Place your finger for verification...")
    arduino.write(b'V')  # Send 'Verify' command
    
    fingerprint_id = None
    while True:
        if arduino.in_waiting:
            line = arduino.readline().decode().strip()
            print(f"🔹 {line}")

            if "ID:" in line:
                fingerprint_id = int(line.split(":")[1].strip())
                break

    if fingerprint_id:
        user = get_user_by_fingerprint(fingerprint_id)
        if user:
            print(f"✅ Welcome {user} (ID: {fingerprint_id})")
        else:
            print("⚠️ Fingerprint not found in database.")
    else:
        print("❌ Verification failed.")
