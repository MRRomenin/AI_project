import React, { useState, useRef } from 'react';
import CameraView from './camera/CameraView';

export default function CameraContainer({ onCameraCapture }) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null); // Для хранения и остановки видеопотока

  // 1. Включение камеры
  const handleOpenCamera = async () => {
    try {
      setIsCameraOpen(true);
      
      // Запрашиваем доступ к камере
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: false
      });

      streamRef.current = stream;

      // Связываем поток с тегом <video> из CameraView
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Ошибка доступа к камере:', err);
      alert('Не удалось получить доступ к камере');
      setIsCameraOpen(false);
    }
  };

  // 2. Отключение камеры
  const handleCloseCamera = () => {
    if (streamRef.current) {
      // Обязательно останавливаем все треки, чтобы погас индикатор камеры
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  // 3. Захват кадра (Снимок)
  const handleCapture = () => {
    const video = videoRef.current;
    if (!video) return;

    // Создаем виртуальный Canvas для отрисовки текущего кадра
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Конвертируем кадр в готовый File (PNG)
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'camera_shot.png', { type: 'image/png' });
        onCameraCapture(file); // Передаем File в App.jsx
        handleCloseCamera();   // Закрываем камеру
      }
    }, 'image/png');
  };

  return (
    <div>
      <button className="btn-open" onClick={handleOpenCamera}>
        📷 Камера
      </button>

      <CameraView 
        isOpen={isCameraOpen}
        videoRef={videoRef}
        onCapture={handleCapture}
        onPlusClick={() => console.log('turn on')}
        onBackClick={handleCloseCamera}
      />
    </div>
  );
}