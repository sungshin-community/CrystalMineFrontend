import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"
const NoticeIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Circle cx={18} cy={18} r={18} fill="#67E499" />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M9 16.41a2 2 0 0 1 2-2h3.333l4.95-5.104c.624-.645 1.717-.202 1.717.696v4.532a4 4 0 0 1 0 8v4.533c0 .898-1.093 1.34-1.718.696l-4.949-5.104H11a2 2 0 0 1-2-2v-4.25Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default NoticeIcon
