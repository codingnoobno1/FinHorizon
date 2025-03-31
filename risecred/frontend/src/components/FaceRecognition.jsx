// biometrics/FaceRecognition.js
import { useRef, useState } from "react";
import axios from "axios";

const FaceRecognition = ({ setLoading }) => {
  const [biometricStatus, setBiometricStatus] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setVideoStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  const captureAndSendFace = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    canvas.width = width;
    canvas.height = height;

    context.drawImage(videoRef.current, 0, 0, width, height);

    const imageData = canvas.toDataURL("image/jpeg");

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/face-recognition", {
        image: imageData,
      });
      setBiometricStatus(response.data.message);
    } catch (error) {
      setBiometricStatus("Face Recognition Failed");
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={startCamera}
        className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
      >
        Start Camera
      </button>

      <button
        onClick={captureAndSendFace}
        className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
      >
        Capture Face
      </button>

      <p className="mt-3 text-blue-600">{biometricStatus}</p>

      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full h-64 border rounded-md"
      />
    </div>
  );
};

export default FaceRecognition;
