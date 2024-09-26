import React from 'react';

interface PipelineMiddleProps {
  color?: string;
  borderColor?: string;
  width?: string;
  height?: string;
  text?: string;
  textColor?: string;
}

const PipelineMiddle: React.FC<PipelineMiddleProps> = ({
  color = 'currentColor',
  borderColor = 'currentColor',
  width = '274',
  height = '60',
  text = '',
  textColor = 'black',
}) => {
  return (
    <svg fill="none" height={height} viewBox="0 0 274 60" width={width} xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_302_305)">
        <mask fill="white" id="path-1-inside-1_302_305">
          <path
            clipRule="evenodd"
            d="M257.152 3.01544C256.439 1.76914 255.114 1 253.679 1H6.89269C3.8214 1 1.89593 4.31793 3.41972 6.98456L14.8659 27.0154C15.5686 28.2452 15.5686 29.7548 14.8659 30.9846L3.41972 51.0154C1.89593 53.6821 3.8214 57 6.89269 57H253.679C255.114 57 256.439 56.2309 257.152 54.9846L270.866 30.9846C271.569 29.7548 271.569 28.2452 270.866 27.0154L257.152 3.01544Z"
            fillRule="evenodd"
          />
        </mask>
        <path
          clipRule="evenodd"
          d="M257.152 3.01544C256.439 1.76914 255.114 1 253.679 1H6.89269C3.8214 1 1.89593 4.31793 3.41972 6.98456L14.8659 27.0154C15.5686 28.2452 15.5686 29.7548 14.8659 30.9846L3.41972 51.0154C1.89593 53.6821 3.8214 57 6.89269 57H253.679C255.114 57 256.439 56.2309 257.152 54.9846L270.866 30.9846C271.569 29.7548 271.569 28.2452 270.866 27.0154L257.152 3.01544Z"
          fill={color}
          fillRule="evenodd"
        />
        <path
          d="M14.8659 27.0154L13.9977 27.5116L14.8659 27.0154ZM14.8659 30.9846L13.9977 30.4884L14.8659 30.9846ZM270.866 30.9846L271.734 31.4807V31.4807L270.866 30.9846ZM270.866 27.0154L271.734 26.5193V26.5193L270.866 27.0154ZM257.152 3.01544L258.02 2.51931L257.152 3.01544ZM257.152 54.9846L258.02 55.4807L257.152 54.9846ZM6.89269 2H253.679V0H6.89269V2ZM15.7342 26.5193L4.28796 6.48842L2.55148 7.4807L13.9977 27.5116L15.7342 26.5193ZM15.7342 31.4807C16.6126 29.9435 16.6126 28.0565 15.7342 26.5193L13.9977 27.5116C14.5247 28.4339 14.5247 29.5661 13.9977 30.4884L15.7342 31.4807ZM4.28796 51.5116L15.7342 31.4807L13.9977 30.4884L2.55148 50.5193L4.28796 51.5116ZM253.679 56H6.89269V58H253.679V56ZM269.998 30.4884L256.283 54.4884L258.02 55.4807L271.734 31.4807L269.998 30.4884ZM269.998 27.5116C270.525 28.4339 270.525 29.5661 269.998 30.4884L271.734 31.4807C272.613 29.9435 272.613 28.0565 271.734 26.5193L269.998 27.5116ZM256.283 3.51158L269.998 27.5116L271.734 26.5193L258.02 2.51931L256.283 3.51158ZM2.55148 50.5193C0.646742 53.8526 3.05357 58 6.89269 58V56C4.58922 56 3.14512 53.5116 4.28796 51.5116L2.55148 50.5193ZM253.679 2C254.755 2 255.749 2.57686 256.283 3.51158L258.02 2.51931C257.13 0.961431 255.473 0 253.679 0V2ZM253.679 58C255.473 58 257.13 57.0386 258.02 55.4807L256.283 54.4884C255.749 55.4231 254.755 56 253.679 56V58ZM6.89269 0C3.05358 0 0.646742 4.14741 2.55148 7.4807L4.28796 6.48842C3.14512 4.48845 4.58922 2 6.89269 2V0Z"
          fill={borderColor}
          mask="url(#path-1-inside-1_302_305)"
        />
      </g>
      {text && (
        <text
          dominantBaseline="middle"
          fill={textColor}
          fontFamily="Inter, sans-serif"
          fontSize="10"
          fontWeight={700}
          textAnchor="middle"
          x="50%"
          y="50%"
        >
          {text}
        </text>
      )}
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="60"
          id="filter0_d_302_305"
          width="272.506"
          x="0.88678"
          y="0"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.215686 0 0 0 0 0.254902 0 0 0 0 0.317647 0 0 0 0.08 0" />
          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_302_305" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_302_305" mode="normal" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default PipelineMiddle;
