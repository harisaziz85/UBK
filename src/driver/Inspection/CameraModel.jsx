import React, { useRef, useState, useEffect } from "react";
import { X, Camera } from "lucide-react";

const CameraModal = ({ context, onClose, onSave }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    // Request camera access
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } }) // rear camera on mobile
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Camera error:", err);
      });

    return () => {
      // stop camera when modal closes
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context2d = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context2d.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setCapturedImage(dataUrl);
      console.log("Captured Image:", dataUrl); // send to backend if needed
    }
  };

  const handleSave = () => {
    if (capturedImage) {
      onSave(capturedImage, context);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="border-b border-[#E9E9E9] px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Take Photo - {context}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Camera Preview */}
        <div className="p-6 flex flex-col items-center">
          {!capturedImage ? (
            <video ref={videoRef} autoPlay playsInline className="rounded-lg w-full" />
          ) : (
            <img src={capturedImage} alt="Captured" className="rounded-lg w-full" />
          )}

          <canvas ref={canvasRef} className="hidden" />

          {/* Buttons */}
          <div className="flex gap-4 mt-4 w-full">
            <button
              onClick={onClose}
              className=" cursor-pointer flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            {!capturedImage ? (
              <button
                onClick={capturePhoto}
                className="cursor-pointer flex-1 px-6 py-3 bg-[#043677] text-white rounded-lg font-medium  flex items-center justify-center"
              >
                <Camera className="mr-2" size={18} /> Capture
              </button>
            ) : (
              <button
                onClick={handleSave}
                className=" cursor-pointer flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraModal;