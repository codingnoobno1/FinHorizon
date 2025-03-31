import cv2
import os
import time

def detect_and_capture_faces(save_path="captured_faces", max_faces=10):
    # Open the camera
    cam = cv2.VideoCapture(0)
    
    # Check if the camera opened successfully
    if not cam.isOpened():
        print("Error: Unable to access the camera")
        return
    
    # Load the pre-trained Haar Cascade for face detection
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    
    # Create directory to save captured faces
    if not os.path.exists(save_path):
        os.makedirs(save_path)

    face_count = 0  # Variable to count captured faces
    capture_start_time = time.time()
    
    print(f"Press 'q' to quit or wait for {max_faces} faces to be captured.")
    
    while face_count < max_faces:
        ret, frame = cam.read()
        
        if not ret:
            print("Error: Failed to grab frame")
            break
        
        # Convert the frame to grayscale for better performance
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # Detect faces in the image
        faces = face_cascade.detectMultiScale(
            gray, 
            scaleFactor=1.1,    # Try adjusting this value for better results
            minNeighbors=5,     # Minimum number of neighbors to consider a face
            minSize=(30, 30),   # Minimum size of detected face
            flags=cv2.CASCADE_SCALE_IMAGE
        )
        
        # If faces are detected, save the images
        if len(faces) > 0:
            for (x, y, w, h) in faces:
                face_count += 1
                # Save the face image
                face_image = frame[y:y+h, x:x+w]
                timestamp = int(time.time())
                face_filename = os.path.join(save_path, f"face_{face_count}_{timestamp}.jpg")
                cv2.imwrite(face_filename, face_image)
                
                # Draw rectangles around faces for visualization
                cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
            
            print(f"Captured {face_count} face(s)")
        
        # Show the live feed with potential face detection rectangles
        cv2.imshow("Face Detection", frame)

        # Exit the loop if the user presses 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            print("Exiting...")
            break

    # Release the camera and close all OpenCV windows
    cam.release()
    cv2.destroyAllWindows()

    print(f"Face capture complete. {face_count} face(s) saved.")

if __name__ == "__main__":
    detect_and_capture_faces(max_faces=5)  # Change max_faces to capture more or fewer faces
