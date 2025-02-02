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
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <Path
      stroke="#9DA4AB"
      strokeWidth={1.5}
      d="M3.75 3.75h12.5c.69 0 1.25.56 1.25 1.25v7.4c0 .69-.56 1.25-1.25 1.25h-5.723c-.337 0-.66.136-.895.378l-2.738 2.811a.375.375 0 0 1-.644-.261V14.9c0-.69-.56-1.25-1.25-1.25H3.75c-.69 0-1.25-.56-1.25-1.25V5c0-.69.56-1.25 1.25-1.25Z"
    />
  </Svg>
);
