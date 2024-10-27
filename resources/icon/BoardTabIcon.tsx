import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const BoardTabIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="26"
    fill="none"
    viewBox="0 0 25 26"
    {...props}>
    <Path
      fill={props.color}
      d="M12.402.813C5.671.813.215 6.269.215 13c0 6.732 5.456 12.188 12.187 12.188 6.732 0 12.188-5.456 12.188-12.188C24.59 6.269 19.134.812 12.402.812zm7.97 11.76l-2.937-2.938V15.3h-1.068V9.715l-5.343 5.34-.756-.755 5.265-5.264h-5.52V7.967h5.753l-3.014-3.014.756-.756 2.859 2.858V4.262h1.068v2.874l2.102-2.102.756.756-2.179 2.179h2.95v1.068h-2.718l2.78 2.781-.754.756z"></Path>
  </Svg>
);

export default BoardTabIcon;
