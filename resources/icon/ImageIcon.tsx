import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const ImageIcon = (props: any) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M24 21.3333V2.66667C24 1.2 22.8 0 21.3333 0H2.66667C1.2 0 0 1.2 0 2.66667V21.3333C0 22.8 1.2 24 2.66667 24H21.3333C22.8 24 24 22.8 24 21.3333ZM7.86667 14.64L10.6667 18.0133L14.8 12.6933C15.0667 12.3467 15.6 12.3467 15.8667 12.7067L20.5467 18.9467C20.88 19.3867 20.56 20.0133 20.0133 20.0133H4.02667C3.46667 20.0133 3.16 19.3733 3.50667 18.9333L6.82667 14.6667C7.08 14.32 7.58667 14.3067 7.86667 14.64V14.64Z"
      fill="#6E7882"
    />
  </Svg>
);

export default ImageIcon;
