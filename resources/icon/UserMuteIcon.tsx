import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const UserMuteIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M9.26 5.01a3.999 3.999 0 1 1 5.53 5.53L9.26 5.01Zm11.35 11.35c-.02-1.1-.63-2.11-1.61-2.62-.54-.28-1.13-.54-1.77-.76l3.38 3.38Zm1.19 4.02L3.42 2 2 3.41l8.89 8.89c-1.81.23-3.39.79-4.67 1.45a2.97 2.97 0 0 0-1.61 2.66v2.78h13.17l2.61 2.61 1.41-1.42Z"
      fill="#333D4B"
    />
  </Svg>
)

export default UserMuteIcon
