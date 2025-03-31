
import serial
import time

# Change 'COM3' to the correct port for your Arduino (Check Arduino IDE -> Tools -> Port)
arduino = serial.Serial('COM3', 9600, timeout=1)

time.sleep(2)  # Give time for connection

print("Sending fingerprint register command...")

# Example: Send a command to enroll fingerprint (Modify based on your sensor's protocol)
arduino.write(b'\x01\x02\x03')  # Replace with actual fingerprint sensor command

time.sleep(1)

# Read response from sensor
while arduino.in_waiting:
    response = arduino.read()
    print(response)

arduino.close()
