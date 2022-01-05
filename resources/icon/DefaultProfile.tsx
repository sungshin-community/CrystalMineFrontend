import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

const DefaultProfile = (props: any) => (
  <Svg
    width={72}
    height={72}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={36} cy={36} r={36} fill="#A055FF" />
    <Path
      d="M36 19.286a8.357 8.357 0 1 1 0 16.713 8.357 8.357 0 0 1 0-16.713Zm0 20.892c9.235 0 16.714 3.74 16.714 8.358v4.178H19.286v-4.178c0-4.618 7.48-8.358 16.714-8.358Z"
      fill="#fff"
    />
  </Svg>
);

export default DefaultProfile;
