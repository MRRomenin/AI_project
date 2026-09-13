import React, { useState, useEffect, useRef  } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CanvasView from './components/Canvas';
import Footer from './components/Footer';
import './App.css';
import { resizeImageFile } from './utils/imageUtils';

export default function App() {
  const [mode, setMode] = useState('bg');
  const [prompt, setPrompt] = useState('cyberpunk neon city background, highly detailed...');
  const [status, setStatus] = useState('Изображение загружено. Объект успешно сегментирован в памяти устройства.');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      setStatus('Сжатие изображения...');
      
      // Уменьшаем изображение (например, максимум до 1280x720)
      const resizedFile = await resizeImageFile(file, 1280, 520, 0.85);

      setSelectedFile(resizedFile);      // Передаем уменьшенный файл в CanvasView
      sendImagetoServer(resizedFile);     // Отправляем легкий файл на FastAPI
      setStatus(`Загружен файл: ${resizedFile.name} (${Math.round(resizedFile.size / 1024)} KB)`);
    } catch (error) {
      console.error('Ошибка при изменении размера:', error);
      setStatus('Ошибка обработки изображения.');
    }
  };

//   const toDataURL = async (url) => {
//   return fetch(url)
//     .then((response) => {
//       return response.blob();
//     })
//     .then((blob) => {
//       return URL.createObjectURL(blob);
//     });
// }


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
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/png, image/jpeg, image/webp" 
        style={{ display: 'none' }} 
      />
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
        <CanvasView imageFile={selectedFile}/>
      </div>
      <Footer status={status} />
    </div>
  );
 
}