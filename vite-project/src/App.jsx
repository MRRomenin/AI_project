import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [mode, setMode] = useState('bg');
  const [prompt, setPrompt] = useState('cyberpunk neon city background, highly detailed...');
  const [status, setStatus] = useState('Изображение загружено. Объект успешно сегментирован в памяти устройства.');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageSelect = () => {
    alert('Выбор файла изображения');
  };

  const toDataURL = async (url) => {
  return fetch(url)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      return URL.createObjectURL(blob);
    });
}


//заменить этот метод на sendImagetoServer
const downloadFile = (file) => {
  if (!file) return;

  // 1. Создаем локальную временную ссылку на объект File в памяти браузера
  const downloadUrl = URL.createObjectURL(file);

  // 2. Создаем виртуальный элемент <a>
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = file.name || "camera_shot.png"; // Имя файла при скачивании
  // дальше идет backend
  // 3. Эмулируем клик для запуска скачивания
  document.body.appendChild(link);
  console.log(link)
  link.click();

  // 4. Очищаем DOM и освобождаем память
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
};

const handleCameraCapture = (file) => {
  
    setSelectedFile(file);
    console.log(file);
    downloadFile(file);
    setStatus('Снимок с камеры успешно получен!');
  };


  const handleGenerate = () => {
    setIsLoading(true);
    setStatus('Запрос отправлен на сервер...');
    
    // Имитация асинхронного ответа от FastAPI
    setTimeout(() => {
      setIsLoading(false);
      setStatus('Генерация успешно завершена!');
    }, 2000);
  };

  const handleUndo = () => {
    setStatus('Отмена последнего действия.');
  };

  return (
    <div className="editor-container">
      <Header />
      <div className="editor-body">
        <Sidebar 
        onCameraCapture={handleCameraCapture}
          onImageSelect={handleImageSelect}
          mode={mode}
          setMode={setMode}
          prompt={prompt}
          setPrompt={setPrompt}
          onGenerate={handleGenerate}
          onUndo={handleUndo}
          isLoading={isLoading}
        />
        <Canvas />
      </div>
      <Footer status={status} />
    </div>
  );

  
}