import React, { useState, useEffect  } from 'react';
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


const sendImagetoServer = (file) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  fetch("/api/upload", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => console.log("Успешный ответ от FastAPI:", data))
    .catch((error) => console.error("Ошибка при отправке:", error));

};

const handleCameraCapture = (file) => {
  
    setSelectedFile(file);
    console.log(file);
    sendImagetoServer(file);
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