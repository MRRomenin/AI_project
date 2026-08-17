import React from "react";

export default function ImageLoader({ onImageSelect}) {
  // const [isCameraOpen, setIsCameraOpen] = useState(false);
  // const videoRef = useRef(null);

    return (
    <div>
      <div className="section-title">1. Исходные данные</div>
      
        <button className="btn-open" onClick={onImageSelect}>
          Открыть...
        </button>
      </div>
  );
}