import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface ChatIconProps {
  width?: number;
  height?: number;
}

const ChatIcon = ({width = 16, height = 16}: ChatIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M3 3H13C13.5523 3 14 3.44772 14 4V9.92C14 10.4723 13.5523 10.92 13 10.92H8.42194C8.15216 10.92 7.89383 11.029 7.70559 11.2223L5.5149 13.4714C5.32709 13.6642 5 13.5312 5 13.262V11.92C5 11.3677 4.55228 10.92 4 10.92H3C2.44772 10.92 2 10.4723 2 9.92V4C2 3.44772 2.44772 3 3 3Z"
        stroke="#9DA4AB"
        strokeWidth={1.3}
      />
    </Svg>
  );
};

export default ChatIcon;

export const FooterChat = (props: any) => (
  <Svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M3.75 3.75H16.25C16.9404 3.75 17.5 4.30965 17.5 5V12.4C17.5 13.0904 16.9404 13.65 16.25 13.65H10.5274C10.1902 13.65 9.86729 13.7863 9.63199 14.0278L6.89363 16.8392C6.65886 17.0802 6.25 16.914 6.25 16.5776V14.9C6.25 14.2096 5.69036 13.65 5 13.65H3.75C3.05964 13.65 2.5 13.0904 2.5 12.4V5C2.5 4.30964 3.05964 3.75 3.75 3.75Z"
      stroke="#9DA4AB"
      stroke-width="1.5"
    />
  </Svg>
);
