import * as React from 'react';
import Svg, {Path, Circle, Defs, LinearGradient, Stop} from 'react-native-svg';

const CrystalBall = (props: any) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M20.5093 24H11.4907C10.9857 24 10.524 24.2853 10.2981 24.737L8.96481 27.4037C8.52154 28.2903 9.1662 29.3333 10.1574 29.3333H21.8426C22.8338 29.3333 23.4785 28.2902 23.0352 27.4037L21.7019 24.737C21.476 24.2853 21.0143 24 20.5093 24Z"
      fill="#FFDF64"
    />
    <Path
      d="M22.9213 28H9.07869C8.82617 28 8.59533 28.1427 8.4824 28.3685C8.26077 28.8118 8.5831 29.3333 9.07869 29.3333H22.9213C23.4169 29.3333 23.7392 28.8118 23.5176 28.3685C23.4047 28.1427 23.1738 28 22.9213 28Z"
      fill="#FFC701"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.4774 24C20.9301 24 21.3792 23.8906 21.76 23.6457C24.7113 21.7485 26.6663 18.4359 26.6663 14.6667C26.6663 8.77563 21.8907 4 15.9997 4C10.1086 4 5.33301 8.77563 5.33301 14.6667C5.33301 18.4359 7.28801 21.7485 10.2393 23.6457C10.6201 23.8906 11.0692 24 11.522 24H20.4774Z"
      fill="#A055FF"
    />
    <Circle
      opacity={0.4}
      cx={16.922}
      cy={13.1812}
      r={7.27362}
      transform="rotate(23.6595 16.922 13.1812)"
      fill="url(#paint0_linear)"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.66677 4.00116C8.97086 5.56605 9.71926 6.80214 10.6667 7.30424C9.71933 7.80629 8.97098 9.04222 8.66685 10.6069C8.36271 9.04221 7.61434 7.80627 6.66699 7.30424C7.61436 6.80209 8.36271 5.56601 8.66677 4.00116Z"
      fill="#E5D2FC"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.2812 9.33214C12.7291 11.2138 13.8324 12.7003 15.2293 13.3039C13.8323 13.9076 12.7289 15.3942 12.2811 17.276C11.8333 15.3942 10.7299 13.9077 9.33301 13.304C10.7299 12.7003 11.8333 11.2139 12.2812 9.33214Z"
      fill="#E5D2FC"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear"
        x1={16.922}
        y1={5.90763}
        x2={16.922}
        y2={20.4549}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="white" />
        <Stop offset={1} stopColor="white" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default CrystalBall;
