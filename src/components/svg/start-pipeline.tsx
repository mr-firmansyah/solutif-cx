interface PipelineFirstProps {
  color?: string;
  borderColor?: string;
  width?: string;
  height?: string;
  text?: string;
  textColor?: string;
  onClick?: () => void;
}

const PipelineStart: React.FC<PipelineFirstProps> = ({
  color = 'currentColor',
  borderColor = 'currentColor',
  width = '276',
  height = '60',
  text = '',
  textColor = 'black',
  onClick,
}) => {
  return (
    <svg fill="none" height={height} onClick={onClick} viewBox="0 0 276 60" width={width} xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_302_314)">
        <mask fill="white" id="path-1-inside-1_302_314">
          <path clip-rule="evenodd" d="M2 5C2 2.79086 3.79086 1 6 1H255.679C257.114 1 258.44 1.76914 259.152 3.01544L272.866 27.0154C273.569 28.2452 273.569 29.7548 272.866 30.9846L259.152 54.9846C258.44 56.2309 257.114 57 255.679 57H6C3.79086 57 2 55.2091 2 53V5Z"
            fill-rule="evenodd" />
        </mask>
        <path clip-rule="evenodd" d="M2 5C2 2.79086 3.79086 1 6 1H255.679C257.114 1 258.44 1.76914 259.152 3.01544L272.866 27.0154C273.569 28.2452 273.569 29.7548 272.866 30.9846L259.152 54.9846C258.44 56.2309 257.114 57 255.679 57H6C3.79086 57 2 55.2091 2 53V5Z"
          fill={color}
          fill-rule="evenodd" />
        <path
          d="M272.866 27.0154L273.734 26.5193V26.5193L272.866 27.0154ZM272.866 30.9846L273.734 31.4807V31.4807L272.866 30.9846ZM259.152 54.9846L260.02 55.4807L259.152 54.9846ZM259.152 3.01544L260.02 2.51931L259.152 3.01544ZM255.679 0H6V2H255.679V0ZM258.283 3.51158L271.998 27.5116L273.734 26.5193L260.02 2.51931L258.283 3.51158ZM271.998 27.5116C272.525 28.4339 272.525 29.5661 271.998 30.4884L273.734 31.4807C274.613 29.9435 274.613 28.0565 273.734 26.5193L271.998 27.5116ZM271.998 30.4884L258.283 54.4884L260.02 55.4807L273.734 31.4807L271.998 30.4884ZM6 58H255.679V56H6V58ZM1 5V53H3V5H1ZM258.283 54.4884C257.749 55.4231 256.755 56 255.679 56V58C257.473 58 259.13 57.0386 260.02 55.4807L258.283 54.4884ZM6 0C3.23858 0 1 2.23858 1 5H3C3 3.34315 4.34315 2 6 2V0ZM6 56C4.34315 56 3 54.6569 3 53H1C1 55.7614 3.23858 58 6 58V56ZM255.679 2C256.755 2 257.749 2.57686 258.283 3.51158L260.02 2.51931C259.13 0.96143 257.473 0 255.679 0V2Z"
          fill={borderColor} mask="url(#path-1-inside-1_302_314)" />
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
        <filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="60" id="filter0_d_302_314" width="275.393"
          x="0" y="0">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha"
            type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix type="matrix"
            values="0 0 0 0 0.215686 0 0 0 0 0.254902 0 0 0 0 0.317647 0 0 0 0.08 0" />
          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_302_314" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_302_314" mode="normal" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default PipelineStart;
