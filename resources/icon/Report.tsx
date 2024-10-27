import * as React from 'react';
import Svg, {SvgProps, Path, Rect} from 'react-native-svg';

const NoReport = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      stroke="#9DA4AB"
      strokeWidth={1.643}
      d="M6.158 11.68a5.845 5.845 0 1 1 11.689 0v4.177H6.157V11.68Z"
    />
    <Path
      stroke="#9DA4AB"
      strokeLinejoin="round"
      strokeWidth={1.643}
      d="M4.251 17.393c0-.598.485-1.083 1.083-1.083h13.333c.598 0 1.083.485 1.083 1.083v.953c0 .598-.485 1.082-1.083 1.082H5.334a1.083 1.083 0 0 1-1.083-1.082v-.953Z"
    />
    <Rect
      width={1.905}
      height={2.857}
      x={11.047}
      y={0.25}
      fill="#9DA4AB"
      rx={0.952}
    />
    <Rect
      width={1.905}
      height={2.857}
      x={17.711}
      y={2.152}
      fill="#9DA4AB"
      rx={0.952}
      transform="rotate(44.41 17.71 2.152)"
    />
    <Rect
      width={1.905}
      height={2.857}
      fill="#9DA4AB"
      rx={0.952}
      transform="scale(-1 1) rotate(44.41 -5.782 -6.627)"
    />
  </Svg>
);

export default NoReport;

export const Report = (props: any) => (
  <Svg
    width={18}
    height={21}
    fill="#9DA4AB"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M3 12a6 6 0 1 1 12 0v5H3v-5ZM1 17h16v3H1z"
      stroke="#9DA4AB"
      strokeWidth={2}
    />
    <Path
      fill="#9DA4AB"
      d="M8 0h2v3H8zM15 2l1.429 1.4-2.1 2.143-1.428-1.4zM3 2 1.571 3.4l2.1 2.143 1.428-1.4z"
    />
  </Svg>
);

export const BlackReport = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <Path
      stroke="#3A424E"
      strokeWidth={1.5}
      d="M15.085 10.416v4.25H4.918v-4.25a5.083 5.083 0 0 1 10.167 0Z"
    />
    <Path
      stroke="#3A424E"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.167 14.499h11.666c.507 0 .917.41.917.917v.833c0 .506-.41.917-.917.917H4.167a.917.917 0 0 1-.917-.917v-.833c0-.507.41-.917.917-.917Z"
    />
    <Rect
      width={1.667}
      height={2.5}
      x={9.168}
      y={0.416}
      fill="#3A424E"
      rx={0.833}
    />
    <Rect
      width={1.667}
      height={2.5}
      x={15}
      y={2.083}
      fill="#3A424E"
      rx={0.833}
      transform="rotate(44.41 15 2.083)"
    />
    <Rect
      width={1.667}
      height={2.5}
      fill="#3A424E"
      rx={0.833}
      transform="scale(-1 1) rotate(44.41 -5.051 -5.083)"
    />
  </Svg>
);
