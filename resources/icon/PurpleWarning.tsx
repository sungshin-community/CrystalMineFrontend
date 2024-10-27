import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const PurpleWarning = (props: any) => (
  <Svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx="8" cy="8" r="8" fill="#A055FF" />
    <Path
      d="M8.41041 4L8.33388 9.68475H7.41558L7.33905 4H8.41041ZM7.17507 11.2699C7.16414 10.8873 7.4921 10.5703 7.87473 10.5703C8.26282 10.5703 8.57986 10.8873 8.57439 11.2699C8.57986 11.658 8.26282 11.975 7.87473 11.9805C7.4921 11.975 7.16414 11.658 7.17507 11.2699Z"
      fill="white"
    />
  </Svg>
);

export default PurpleWarning;
