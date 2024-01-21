import * as React from "react"
import Svg, { SvgProps, Circle, Rect, Path, G, Defs, ClipPath } from "react-native-svg"

const TestBlindIcon = (props: any) => (
    <Svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Circle cx="18" cy="18" r="18" fill="#89919A"/>
    <G clip-path="url(#clip0_6425_508)">
    <Path d="M8.30353 22.7484C7.72458 23.7484 8.44617 25 9.60167 25H26.3983C27.5538 25 28.2754 23.7484 27.6965 22.7484L19.2981 8.24224C18.7204 7.24431 17.2796 7.24431 16.7019 8.24224L8.30353 22.7484ZM19 21C19 21.5523 18.5523 22 18 22C17.4477 22 17 21.5523 17 21C17 20.4477 17.4477 20 18 20C18.5523 20 19 20.4477 19 21ZM19 17.625C19 18.1773 18.5523 18.625 18 18.625C17.4477 18.625 17 18.1773 17 17.625V14.375C17 13.8227 17.4477 13.375 18 13.375C18.5523 13.375 19 13.8227 19 14.375V17.625Z" fill="white"/>
    </G>
    <Defs>
    <ClipPath id="clip0_6425_508">
    <Rect width="24" height="24" fill="white" transform="translate(6 4)"/>
    </ClipPath>
    </Defs>
    </Svg>
)

export default TestBlindIcon;