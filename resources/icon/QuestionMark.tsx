import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

const QuestionMark = (props: any) => (
  <Svg
    width={14}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={7} cy={7} r={6.5} stroke="#A3A3A3" />
    <Path
      d="M6.079 8.69h1.243c-.33-2.497 1.826-1.694 1.826-4.081 0-1.32-1.001-2.068-2.299-2.123-1.089-.055-2.398.572-2.519 2.519h1.375c.055-.88.484-1.298 1.1-1.298.616 0 .88.44.88 1.012 0 1.43-1.969 1.1-1.606 3.971Zm-.187 2.464h1.606V9.592H5.892v1.562Z"
      fill="#A3A3A3"
    />
  </Svg>
)

export default QuestionMark;

export const SignUpQuestionMark = (props: any) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M8.25 13.5H9.75V12H8.25V13.5ZM9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15ZM9 4.5C7.3425 4.5 6 5.8425 6 7.5H7.5C7.5 6.675 8.175 6 9 6C9.825 6 10.5 6.675 10.5 7.5C10.5 9 8.25 8.8125 8.25 11.25H9.75C9.75 9.5625 12 9.375 12 7.5C12 5.8425 10.6575 4.5 9 4.5Z" 
      fill="#87919B"
    />
  </Svg>
)


