import { useEffect, useRef, useState } from "react";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [active, setActive] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }, // rear camera
          audio: true, // include audio for recording
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setActive(true);
      } catch (err) {
        console.error("Camera error:", err);
        alert("Could not access camera. Please allow permission.");
      }
    };

    startCamera();

    // cleanup when leaving
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = () => {
    if (!videoRef.current?.srcObject) return;
    const stream = videoRef.current.srcObject as MediaStream;

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    const chunks: BlobPart[] = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setRecordedVideo(url);

      // optional: auto-download
      const a = document.createElement("a");
      a.href = url;
      a.download = `recording-${Date.now()}.webm`;
      a.click();
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-black min-h-screen">
      <h1 className="text-xl font-bold text-white">📸 AR Camera Recorder</h1>

      {/* Live camera */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={!recording} // prevent echo while recording
        className="w-full h-[70vh] rounded-lg shadow-lg bg-black"
      />

      {/* Controls */}
      {active && (
        <div className="flex gap-4 mt-4">
          {!recording ? (
            <button
              onClick={startRecording}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              ⏺ Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg"
            >
              ⏹ Stop Recording
            </button>
          )}
        </div>
      )}

      {/* Playback of recorded video */}
      {recordedVideo && (
        <div className="mt-6 w-full">
          <h2 className="text-white mb-2">Recorded Video:</h2>
          <video
            src={recordedVideo}
            controls
            className="w-full rounded-lg shadow"
          />
        </div>
      )}
    </div>
  );
}
