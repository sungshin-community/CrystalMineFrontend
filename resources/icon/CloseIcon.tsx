import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

interface CloseIconProps {
  width?: number;
  height?: number;
}

const CloseIcon = ({width = 16, height = 16}: CloseIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
    <G clipPath="url(#clip0_460_1779)">
      <Path
        d="M12.1113 4.11084L4.11133 12.1108"
        stroke="#222222"
        stroke-linecap="round"
      />
      <Path
        d="M12.1113 12.1108L4.11133 4.11084"
        stroke="#222222"
        stroke-linecap="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_460_1779">
        <Rect width={width} height={height} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default CloseIcon;
