import React from 'react';

export default function Actions({ onGenerate, onUndo, isLoading }) {
  return (
    <div className="actions">
      <button className="btn-generate" onClick={onGenerate} disabled={isLoading}>
        {isLoading ? 'Генерация...' : 'Запустить генерацию'}
      </button>
      <button className="btn-undo" onClick={onUndo}>
        Шаг назад (Undo)
      </button>
    </div>
  );
}