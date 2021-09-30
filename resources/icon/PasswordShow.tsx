import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PasswordShow(props: any) {
  return (
    <Svg
      width={21}
      height={14}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M13.364 7A3.182 3.182 0 117 7a3.182 3.182 0 016.364 0z"
        fill="#D6D6D6"
        fillOpacity={0.87}
      />
      <Path
        d="M0 7s3.818-7 10.182-7c6.364 0 10.182 7 10.182 7s-3.819 7-10.182 7C3.818 14 0 7 0 7zm10.182 4.454a4.455 4.455 0 100-8.909 4.455 4.455 0 000 8.91z"
        fill="#D6D6D6"
        fillOpacity={0.87}
      />
    </Svg>
  );
}

export default PasswordShow;
