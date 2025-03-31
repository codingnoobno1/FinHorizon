try:
    import register  # Handles face registration
    import modeltrain  # Handles model training
    import verify  # Handles face verification
except ImportError as e:
    print(f"[ERROR] Missing module: {e}. Ensure all dependencies are installed.")
    exit(1)  # Exit if a module is missing

def main():
    """Main function to handle user input and call appropriate functions."""
    while True:
        print("\n=== Face Recognition System ===")
        print("1. Register Face")
        print("2. Train Model")
        print("3. Verify Face")
        print("4. Exit")

        choice = input("Enter your choice (1-4): ").strip()

        if choice not in {"1", "2", "3", "4"}:
            print("\n[ERROR] Invalid choice! Please enter a number between 1 and 4.")
            continue

        try:
            if choice == "1":
                print("\n[INFO] Registering a new face...")
                register.register_face()  # ✅ Handled by register.py
                print("[SUCCESS] Face registration completed!\n")

            elif choice == "2":
                print("\n[INFO] Training the face recognition model...")
                modeltrain.train_model()  # ✅ Handled by modeltrain.py
                print("[SUCCESS] Model trained successfully!\n")

            elif choice == "3":
                print("\n[INFO] Verifying face...")
                verify.check_face()  # ✅ Handled by verify.py
                print("[INFO] Face verification completed!\n")

            elif choice == "4":
                print("\n[INFO] Exiting program...")
                break  # Exit loop

        except Exception as e:
            print(f"\n[ERROR] An error occurred: {e}")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n[INFO] Program interrupted by user. Exiting...")
