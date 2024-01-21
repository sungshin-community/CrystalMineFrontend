import * as React from "react"
import Svg, { SvgProps, Circle, Rect, Path, G, Defs, ClipPath } from "react-native-svg"

const TestCheckIcon = (props: any) => (
    <Svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Circle cx="18" cy="18" r="18" fill="#67E499"/>
    <Path d="M10 18.3158L15.2708 24L26.5 12" stroke="white" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
)

export default TestCheckIcon;