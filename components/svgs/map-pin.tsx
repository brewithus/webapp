import type { LucideProps } from 'lucide-react';
import React from 'react';

const MapPinSVG: React.FC<LucideProps> = (props): React.JSX.Element => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="#000000"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="miter"
      height={props.height ?? props.width ?? props.size ?? '24'}
      width={props.width ?? props.height ?? props.size ?? '24'}
      {...props} // Spread additional props to the SVG element
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M12,2a8,8,0,0,0-8,8c0,8,8,12,8,12s8-4,8-12A8,8,0,0,0,12,2Zm0,11a3,3,0,1,1,3-3A3,3,0,0,1,12,13Z"
          fill="currentColor"
          // opacity="0.8"
          strokeWidth="0"
        />
        <path d="M20,10c0,8-8,12-8,12S4,18,4,10a8,8,0,0,1,16,0Z"></path>
        <circle cx="12" cy="10" r="3" />
      </g>
    </svg>
  );
};

export default MapPinSVG;
