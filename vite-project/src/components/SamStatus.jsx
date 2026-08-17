import React from 'react';

export default function SamStatus({ statusText }) {
  return (
    <div>
      <div className="section-title">2. Интерактивная маска (SAM)</div>
      <div className="sam-box">
        <div className="sam-mode">Режим: Кликните по объекту на холсте</div>
        <div className="sam-status">
          <span className="dot-green"></span>
          <span>{statusText || 'Статус: Ожидание клика...'}</span>
        </div>
      </div>
    </div>
  );
}