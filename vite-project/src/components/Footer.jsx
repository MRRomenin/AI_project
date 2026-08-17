import React from 'react';

export default function Footer({ status, progress = 0 }) {
  return (
    <footer className="editor-footer">
      <div>Статус: {status}</div>
      <div>
        <span>Инференс: {progress}%</span>
        <span className="progress-bar-track"></span>
      </div>
    </footer>
  );
}