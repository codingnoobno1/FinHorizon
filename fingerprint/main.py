import serial
import time
from register import register_fingerprint
from verify import verify_fingerprint
from fingerdb import get_all_users

# Connect to Arduino
PORT = "COM3"  # Change if needed
arduino = serial.Serial(PORT, 9600, timeout=1)
time.sleep(2)

def menu():
    while True:
        print("\n🔹 Fingerprint System Menu 🔹")
        print("1. Register New Fingerprint")
        print("2. Verify Fingerprint")
        print("3. Show Registered Users")
        print("4. Exit")

        choice = input("Enter choice: ")

        if choice == "1":
            name = input("Enter user name: ")
            register_fingerprint(name, arduino)
        elif choice == "2":
            verify_fingerprint(arduino)
        elif choice == "3":
            users = get_all_users()
            for user in users:
                print(f"🆔 {user[0]} | Name: {user[1]} | Fingerprint ID: {user[2]}")
        elif choice == "4":
            print("🔴 Exiting system...")
            arduino.close()
            break
        else:
            print("❌ Invalid choice, try again.")

if __name__ == "__main__":
    menu()
