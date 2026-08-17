import React from 'react';

export default function SdParams({ mode, setMode, prompt, setPrompt }) {
  return (
    <div>
      <div className="section-title">3. Параметры генерации (SD)</div>
      <div className="tabs">
        <button 
          className={`tab-btn ${mode === 'bg' ? 'active' : 'inactive'}`}
          onClick={() => setMode('bg')}
        >
          Замена фона
        </button>
        <button 
          className={`tab-btn ${mode === 'remove' ? 'active' : 'inactive'}`}
          onClick={() => setMode('remove')}
        >
          Удалить объект
        </button>
      </div>

      <label className="prompt-label">Текстовый запрос (Prompt):</label>
      <textarea 
        className="prompt-textarea"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
    </div>
  );
}