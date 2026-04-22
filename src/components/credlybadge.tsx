// components/credlybadge.tsx
"use client";
import React, { useEffect } from 'react';

interface CredlyBadgeProps {
  badgeId: string;
  width?: number; // 기본값 설정을 위해 옵셔널로 지정
  height?: number;
}

export const CredlyBadge: React.FC<CredlyBadgeProps> = ({ 
  badgeId, 
  width = 150, 
  height = 270 
}) => {
  useEffect(() => {
    // 스크립트가 이미 있는지 확인 (중복 로드 방지)
    const scriptId = 'credly-embed-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "//cdn.credly.com/assets/utilities/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      data-iframe-width={width}
      data-iframe-height={height}
      data-share-badge-id={badgeId}
      data-share-badge-host="https://www.credly.com"
      className="transform transition-transform hover:scale-105" // 마우스 오버 시 살짝 커지는 효과
    />
  );
};

