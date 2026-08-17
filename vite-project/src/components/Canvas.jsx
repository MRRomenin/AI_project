import React from 'react';

export default function Canvas({ onCanvasClick }) {
  return (
    <main className="canvas-area">
      <div className="canvas-frame" onClick={onCanvasClick}>
        {/* Превью интерактивной маски SAM */}
        {/* <div className="sam-mask-preview">
          <div className="user-click-dot"></div>
          <div className="click-label">Клик пользователя (x, y)</div>
          <div className="mask-label">Маска объекта (SAM)</div>
        </div> */}
      </div>
    </main>
  );
}