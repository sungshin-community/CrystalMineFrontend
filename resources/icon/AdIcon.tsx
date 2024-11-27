import * as React from 'react';
import Svg, {SvgProps, Rect, Path} from 'react-native-svg';
const AdIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={23}
    fill="none"
    {...props}>
    <Rect width={29} height={23} fill="#F6F6F6" rx={4} />
    <Path
      fill="#9DA4AB"
      d="m6.91 16 3.047-8.484h1.488L14.504 16h-1.371l-.774-2.238H9.055L8.28 16h-1.37Zm5.074-3.316L10.73 9.063h-.058l-1.248 3.62h2.56ZM15.582 16V7.516h2.836c.828 0 1.541.17 2.139.51.601.335 1.06.822 1.377 1.458.32.633.48 1.387.48 2.262 0 .879-.162 1.639-.486 2.28a3.361 3.361 0 0 1-1.4 1.464c-.61.34-1.34.51-2.192.51h-2.754Zm2.684-1.125c.949 0 1.664-.268 2.144-.803.485-.539.727-1.314.727-2.326 0-1.004-.239-1.771-.715-2.303-.473-.535-1.168-.802-2.086-.802H16.87v6.234h1.395Z"
    />
  </Svg>
);
export default AdIcon;
