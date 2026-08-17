import React from 'react';
import './CameraView.css';

export default function CameraView({ 
  isOpen, 
  videoRef, 
  onCapture, 
  onPlusClick, 
  onBackClick 
}) {
  if (!isOpen) return null;

  return (
    <div className="camera-overlay">
      <div className="camera-container">
        {/* Заголовок */}
        <div className="camera-header">
          <span className="camera-label">Камера</span>
        </div>

        {/* Область видеопотока */}
        <div className="camera-viewport">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="camera-video" 
          />
        </div>

        {/* Панель управления */}
        <div className="camera-toolbar">
          <button 
            type="button" 
            className="camera-btn btn-plus" 
            onClick={onPlusClick}
            aria-label="Добавить файл"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>

          <button 
            type="button" 
            className="camera-btn btn-shutter" 
            onClick={onCapture}
            aria-label="Сделать снимок"
          >
            <div className="shutter-inner" />
          </button>

          <button 
            type="button" 
            className="camera-btn btn-back" 
            onClick={onBackClick}
            aria-label="Назад"
          >
            <svg width="28" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}