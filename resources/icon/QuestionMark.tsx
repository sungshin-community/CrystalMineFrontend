import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';

const QuestionMark = (props: any) => (
  <Svg
    width={14}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={7} cy={7} r={6.5} stroke="#A3A3A3" />
    <Path
      d="M6.079 8.69h1.243c-.33-2.497 1.826-1.694 1.826-4.081 0-1.32-1.001-2.068-2.299-2.123-1.089-.055-2.398.572-2.519 2.519h1.375c.055-.88.484-1.298 1.1-1.298.616 0 .88.44.88 1.012 0 1.43-1.969 1.1-1.606 3.971Zm-.187 2.464h1.606V9.592H5.892v1.562Z"
      fill="#A3A3A3"
    />
  </Svg>
);

export default QuestionMark;

export const SignUpQuestionMark = (props: any) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M7.25 12.5h1.5V11h-1.5v1.5ZM8 .5C3.86.5.5 3.86.5 8c0 4.14 3.36 7.5 7.5 7.5 4.14 0 7.5-3.36 7.5-7.5C15.5 3.86 12.14.5 8 .5ZM8 14c-3.308 0-6-2.693-6-6 0-3.308 2.692-6 6-6 3.307 0 6 2.692 6 6 0 3.307-2.693 6-6 6ZM8 3.5a3 3 0 0 0-3 3h1.5C6.5 5.675 7.175 5 8 5s1.5.675 1.5 1.5c0 1.5-2.25 1.313-2.25 3.75h1.5C8.75 8.562 11 8.375 11 6.5a3 3 0 0 0-3-3Z"
      fill="#87919B"
    />
  </Svg>
);
