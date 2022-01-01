import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const PlusIcon = (props: any) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1Z"
      fill="#D6D6D6"
      fillOpacity={0.87}
    />
  </Svg>
);

export default PlusIcon;
