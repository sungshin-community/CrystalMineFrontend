import * as React from 'react';
import Svg, {SvgProps, Path, Defs, Circle, G} from 'react-native-svg';

const FloatingWriteButton = (props: any) => (
  <Svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx="40" cy="37" r="30" fill="#A055FF" />
    <Path
      d="M49.675 31.491C50.1083 31.0578 50.1083 30.3356 49.675 29.9246L47.0754 27.325C46.6644 26.8917 45.9422 26.8917 45.509 27.325L43.4648 29.358L47.6309 33.5241L49.675 31.491ZM30 42.8339V47H34.1661L46.4533 34.7017L42.2872 30.5356L30 42.8339Z"
      fill="white"
    />
  </Svg>
);

export default FloatingWriteButton;
