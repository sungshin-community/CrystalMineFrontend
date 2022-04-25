import * as React from "react"
import Svg, { SvgProps, Rect } from "react-native-svg"

const DefaultProfile = (props: any) => (
  <Svg
    width={80}
    height={80}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={80} height={80} rx={10} fill="#C4C4C4" />
  </Svg>
);

export default DefaultProfile;
