import React from 'react';

import type { LucideProps } from 'lucide-react';

export const EmptyStarSvg: React.FC<LucideProps> = (
  props,
): React.JSX.Element => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={props.height ?? props.width ?? props.size ?? '24'}
      width={props.width ?? props.height ?? props.size ?? '24'}
      {...props} // Spread additional props to the SVG element
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
          fill="currentColor"
        />
        <path
          d="M10.4127 8.49812L10.5766 8.20419C11.2099 7.06807 11.5266 6.5 12 6.5C12.4734 6.5 12.7901 7.06806 13.4234 8.20419L13.5873 8.49813C13.7672 8.82097 13.8572 8.98239 13.9975 9.0889C14.1378 9.19541 14.3126 9.23495 14.6621 9.31402L14.9802 9.38601C16.2101 9.66428 16.825 9.80341 16.9713 10.2739C17.1176 10.7443 16.6984 11.2345 15.86 12.215L15.643 12.4686C15.4048 12.7472 15.2857 12.8865 15.2321 13.0589C15.1785 13.2312 15.1965 13.4171 15.2325 13.7888L15.2653 14.1272C15.3921 15.4353 15.4554 16.0894 15.0724 16.3801C14.6894 16.6709 14.1137 16.4058 12.9622 15.8756L12.6643 15.7384C12.337 15.5878 12.1734 15.5124 12 15.5124C11.8266 15.5124 11.663 15.5878 11.3357 15.7384L11.0378 15.8756C9.88633 16.4058 9.31059 16.6709 8.92757 16.3801C8.54456 16.0894 8.60794 15.4353 8.7347 14.1272L8.76749 13.7888C8.80351 13.4171 8.82152 13.2312 8.76793 13.0589C8.71434 12.8865 8.59521 12.7472 8.35696 12.4686L8.14005 12.215C7.30162 11.2345 6.88241 10.7443 7.02871 10.2739C7.17501 9.80341 7.78994 9.66427 9.01977 9.38601L9.33794 9.31402C9.68743 9.23495 9.86217 9.19541 10.0025 9.0889C10.1428 8.98239 10.2328 8.82097 10.4127 8.49812Z"
          fill="#ffffff"
          opacity="0.5"
        />
      </g>
    </svg>
  );
};
