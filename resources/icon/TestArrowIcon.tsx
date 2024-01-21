import * as React from "react"
import Svg, { SvgProps, Circle, Rect, Path, G, Defs, ClipPath } from "react-native-svg"

const TestArrowIcon = (props: any) => (
    <Svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Circle cx="18" cy="18" r="18" fill="#67E499"/>
    <Path d="M11 18L18 11L25 18" stroke="white" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M18 11V25" stroke="white" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
)

export default TestArrowIcon;