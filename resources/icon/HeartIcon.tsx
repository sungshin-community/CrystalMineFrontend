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
    <Svg width="20" height="20" viewBox="0 0 20 20" fill={fill}>
      <G clip-path="url(#clip0_1431_29463)">
        <Path
          d="M9.42638 4.72792L9.99739 5.39847L10.5684 4.72792C11.339 3.82295 12.5245 3.25 13.7474 3.25C15.8998 3.25 17.5807 4.93088 17.5807 7.08333C17.5807 8.41197 16.99 9.6761 15.7971 11.1345C14.5956 12.6035 12.8628 14.1766 10.7019 16.1361L10.7008 16.1371L10.3308 16.4739C10.1405 16.6471 9.84992 16.6477 9.65901 16.4752L9.29346 16.1449C9.29319 16.1447 9.29292 16.1445 9.29265 16.1442C7.13194 14.1807 5.39942 12.6058 4.19789 11.1358C3.00483 9.67615 2.41406 8.41198 2.41406 7.08333C2.41406 4.93088 4.09494 3.25 6.2474 3.25C7.4703 3.25 8.65574 3.82295 9.42638 4.72792Z"
          stroke={stroke}
          stroke-width="1.5"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1431_29463">
          <Rect width="20" height="20" fill={fill} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
