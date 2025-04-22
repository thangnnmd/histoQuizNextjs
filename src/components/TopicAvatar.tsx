import React from 'react';

interface TopicAvatarProps {
  seed: string;
  color?: string;
  size?: number;
}

const TopicAvatar: React.FC<TopicAvatarProps> = ({ size = 40 }) => {
  return (
    <div 
      className="relative overflow-hidden rounded-full"
      style={{ width: size, height: size }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 30 20"
        style={{ 
          width: '100%', 
          height: '100%',
          transform: 'scale(1.5)',
          transformOrigin: 'center'
        }}
      >
        <rect width="30" height="20" fill="#DA251D"/>
        <path
          d="M15,5 L17.939,12.061 L25.486,12.061 L19.273,16.439 L22.212,23.5 L15,19.121 L7.788,23.5 L10.727,16.439 L4.514,12.061 L12.061,12.061 L15,5"
          fill="#FFFF00"
          transform="translate(0,-2)"
        />
      </svg>
    </div>
  );
};

export default TopicAvatar; 