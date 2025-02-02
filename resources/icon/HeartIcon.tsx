import React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';

interface HeartIconProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

const HeartIcon = ({
  fill = 'none',
  stroke = '#9DA4AB',
  width = 16,
  height = 16,
}: HeartIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill={fill}>
      <G clipPath="url(#clip0_252_6848)">
        <Path
          d="M7.5048 3.81475L7.99967 4.3959L8.49455 3.81475C9.10188 3.10156 10.0365 2.65 10.9997 2.65C12.694 2.65 14.0163 3.97232 14.0163 5.66667C14.0163 6.71315 13.5516 7.71346 12.6007 8.87597C11.6424 10.0476 10.2595 11.3033 8.52971 12.8718L8.52877 12.8727L8.23273 13.1422C8.09956 13.2634 7.89612 13.2638 7.76249 13.1431L7.47015 12.879C7.46996 12.8788 7.46977 12.8786 7.46958 12.8784C5.73995 11.3067 4.35715 10.0495 3.39878 8.87697C2.44778 7.7135 1.98301 6.71316 1.98301 5.66667C1.98301 3.97232 3.30533 2.65 4.99967 2.65C5.96286 2.65 6.89746 3.10156 7.5048 3.81475Z"
          stroke={stroke}
          strokeWidth={1.3}
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_252_6848">
          <Rect width={width} height={height} fill={fill} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default HeartIcon;

export const FooterHeart = ({
  fill = 'none',
  stroke = '#9DA4AB',
}: HeartIconProps) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={fill}>
      <G clipPath="url(#a)">
        <Path
          stroke={stroke}
          strokeWidth={1.5}
          d="m9.428 4.728.571.67.571-.67a4.24 4.24 0 0 1 3.18-1.478c2.152 0 3.833 1.68 3.833 3.833 0 1.329-.591 2.593-1.784 4.051-1.201 1.47-2.934 3.043-5.095 5.002l-.001.001-.37.337a.5.5 0 0 1-.672.001l-.366-.33C7.134 14.18 5.4 12.604 4.2 11.134 3.007 9.677 2.416 8.413 2.416 7.084c0-2.152 1.68-3.833 3.833-3.833a4.24 4.24 0 0 1 3.18 1.478Z"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill={fill} d="M0 0h20v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
