from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import subprocess

app = FastAPI()

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change for security)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 Run Face Recognition
@app.get("/face-recognition")
def face_recognition():
    try:
        result = subprocess.run(['python', 'components/cam.py'], capture_output=True, text=True)
        return {"message": result.stdout.strip()}
    except Exception as e:
        return {"error": str(e)}

# 🔹 Run Fingerprint Scan
@app.get("/fingerprint-scan")
def fingerprint_scan():
    try:
        result = subprocess.run(['python', 'components/finger.py'], capture_output=True, text=True)
        return {"message": result.stdout.strip()}
    except Exception as e:
        return {"error": str(e)}

# Start the server: `uvicorn main:app --reload`
