import React, { useState, useRef, useEffect } from 'react';
import CameraView from './camera/CameraView';

export default function CameraContainer({ onCameraCapture }) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // 1. Включение камеры (только запуск стрима и открытие окна)
  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: false
      });

      streamRef.current = stream;
      setIsCameraOpen(true);
    } catch (err) {
      console.error('Ошибка доступа к камере:', err);
      alert('Не удалось получить доступ к камере');
      setIsCameraOpen(false);
    }
  };

  // 2. Связываем поток с <video> ПОСЛЕ того, как CameraView отобразится в DOM
  useEffect(() => {
    if (isCameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraOpen]);

  // 3. Отключение камеры
  const handleCloseCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  // 4. Захват кадра и передача файла на главный Canvas через onCameraCapture
  const handleCapture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;

    // Создаем виртуальный холст для снятия текущего кадра
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Конвертируем в File и отправляем на главный холст
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'camera_shot.png', { type: 'image/png' });
        onCameraCapture(file); // Передаем File в родительский компонент
        handleCloseCamera();   // Закрываем модалку камеры
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