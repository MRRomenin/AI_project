import React from 'react';
import ImageLoader from './ImageLoader';
import CameraContainer from './CameraContainer';
import SamStatus from './SamStatus';
import SdParams from './SdParams';
import Actions from './Actions';

export default function Sidebar({ 
  onImageSelect, 
  onCameraCapture,
  mode, 
  setMode, 
  prompt, 
  setPrompt, 
  onGenerate, 
  onUndo,
  isLoading 
}) {
  return (
    <aside className="sidebar">
      <ImageLoader onImageSelect={onImageSelect} />
      <CameraContainer onCameraCapture={onCameraCapture} />
      <SamStatus />
      <SdParams mode={mode} setMode={setMode} prompt={prompt} setPrompt={setPrompt} />
      <Actions onGenerate={onGenerate} onUndo={onUndo} isLoading={isLoading} />
    </aside>
  );
}