import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"
const CommentIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Circle cx={18} cy={18} r={18} fill="#A055FF" />
    <Path
      fill="#fff"
      d="M10.5 10h15a1.5 1.5 0 0 1 1.5 1.5v11.4a1.5 1.5 0 0 1-1.5 1.5h-6.781a1.5 1.5 0 0 0-1.17.56l-3.248 4.043a.45.45 0 0 1-.801-.281V25.9a1.5 1.5 0 0 0-1.5-1.5h-1.5A1.5 1.5 0 0 1 9 22.9V11.5a1.5 1.5 0 0 1 1.5-1.5Z"
    />
    <Path
      fill="#A055FF"
      d="M12 16.9a.6.6 0 0 1 .6-.6h10.8a.6.6 0 1 1 0 1.2H12.6a.6.6 0 0 1-.6-.6Z"
    />
    <Path
      fill="#fff"
      d="M12 13.9a.6.6 0 0 1 .6-.6h10.8a.6.6 0 0 1 0 1.2H12.6a.6.6 0 0 1-.6-.6Z"
    />
    <Path
      fill="#A055FF"
      d="M12 19.9a.6.6 0 0 1 .6-.6h10.8a.6.6 0 0 1 0 1.2H12.6a.6.6 0 0 1-.6-.6Z"
    />
  </Svg>
)
export default CommentIcon
