import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';

const Dots = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <Circle
      cx={9.978}
      cy={15.209}
      r={1.458}
      fill="#3A424E"
      transform="rotate(-90 9.978 15.209)"
    />
    <Circle
      cx={9.978}
      cy={4.839}
      r={1.458}
      fill="#3A424E"
      transform="rotate(-90 9.978 4.839)"
    />
    <Circle
      cx={9.978}
      cy={10.024}
      r={1.458}
      fill="#3A424E"
      transform="rotate(-90 9.978 10.024)"
    />
  </Svg>
);

export default Dots;
