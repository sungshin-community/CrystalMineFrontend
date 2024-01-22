import * as React from "react"
import Svg, {
  SvgProps,
  Circle,
  G,
  Path,
  Defs,
  ClipPath,
} from "react-native-svg"
const AlertIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Circle cx={18} cy={18} r={18} fill="#89919A" />
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M8.304 22.748A1.5 1.5 0 0 0 9.602 25h16.796a1.5 1.5 0 0 0 1.299-2.252L19.297 8.242a1.5 1.5 0 0 0-2.596 0L8.304 22.748ZM19 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0-3.375a1 1 0 1 1-2 0v-3.25a1 1 0 1 1 2 0v3.25Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M6 4h24v24H6z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default AlertIcon
