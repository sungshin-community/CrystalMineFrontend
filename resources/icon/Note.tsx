import * as React from 'react';
import Svg, {Rect, Circle} from 'react-native-svg';

const Note = (props: any) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect
      x={4.667}
      y={5.333}
      width={22.667}
      height={24}
      rx={2}
      fill="#EAECF0"
    />
    <Circle cx={8.00033} cy={8.00006} r={1.33333} fill="#CECFD6" />
    <Circle cx={12.0003} cy={8.00006} r={1.33333} fill="#CECFD6" />
    <Circle cx={16.0003} cy={8.00006} r={1.33333} fill="#CECFD6" />
    <Circle cx={20.0003} cy={8.00006} r={1.33333} fill="#CECFD6" />
    <Circle cx={24.0003} cy={8.00006} r={1.33333} fill="#CECFD6" />
    <Rect
      x={11.334}
      y={2.667}
      width={1.33333}
      height={5.33333}
      rx={0.666667}
      fill="#6E7882"
    />
    <Rect
      x={7.334}
      y={2.667}
      width={1.33333}
      height={5.33333}
      rx={0.666667}
      fill="#6E7882"
    />
    <Rect
      opacity={0.7}
      x={27.334}
      y={12.0001}
      width={1.33333}
      height={22.6667}
      transform="rotate(90 27.334 12.0001)"
      fill="#9DA3AB"
    />
    <Rect
      opacity={0.7}
      x={27.334}
      y={16.0001}
      width={1.33333}
      height={22.6667}
      transform="rotate(90 27.334 16.0001)"
      fill="#9DA3AB"
    />
    <Rect
      opacity={0.7}
      x={27.334}
      y={20.0001}
      width={1.33333}
      height={22.6667}
      transform="rotate(90 27.334 20.0001)"
      fill="#9DA3AB"
    />
    <Rect
      opacity={0.7}
      x={27.334}
      y={24.0001}
      width={1.33333}
      height={22.6667}
      transform="rotate(90 27.334 24.0001)"
      fill="#9DA3AB"
    />
    <Rect
      x={15.334}
      y={2.667}
      width={1.33333}
      height={5.33333}
      rx={0.666667}
      fill="#6E7882"
    />
    <Rect
      x={19.334}
      y={2.667}
      width={1.33333}
      height={5.33333}
      rx={0.666667}
      fill="#6E7882"
    />
    <Rect
      x={23.334}
      y={2.667}
      width={1.33333}
      height={5.33333}
      rx={0.666667}
      fill="#6E7882"
    />
    <Rect
      x={10}
      y={25.3334}
      width={1.33333}
      height={13.3333}
      transform="rotate(-180 10 25.3334)"
      fill="#A055FF"
    />
  </Svg>
);

export default Note;
