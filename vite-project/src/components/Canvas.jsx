import React, { useEffect, useRef } from 'react';

export default function CanvasView({ imageFile }) {
  const myCanvas = useRef(null);

  useEffect(() => {
    if (!imageFile) return;

    const canvas = myCanvas.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    const image = new Image();
    const imageUrl = URL.createObjectURL(imageFile);

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      URL.revokeObjectURL(imageUrl);
    };

    image.onerror = (err) => {
      console.error('Ошибка загрузки изображения на Canvas:', err);
    };

    image.src = imageUrl;
  }, [imageFile]);

  return (
    <main className="canvas-area">
      <div className="canvas-frame">
        <canvas ref={myCanvas} />
      </div>
    </main>
  );
}