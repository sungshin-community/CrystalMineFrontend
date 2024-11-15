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

export const FooterReport = (props: SvgProps) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M6.15767 11.6791C6.15767 8.45115 8.7744 5.83442 12.0023 5.83442C15.2302 5.83442 17.8469 8.45115 17.8469 11.6791V15.8571H6.15767V11.6791Z"
      stroke="#9DA4AB"
      stroke-width="1.64346"
    />
    <Path
      d="M4.25142 17.3926C4.25142 16.7947 4.73611 16.31 5.33401 16.31H18.6674C19.2653 16.31 19.75 16.7947 19.75 17.3926V18.3456C19.75 18.9435 19.2653 19.4282 18.6674 19.4282H5.33401C4.73611 19.4282 4.25142 18.9435 4.25142 18.3456V17.3926Z"
      stroke="#9DA4AB"
      stroke-width="1.64346"
      stroke-linejoin="round"
    />
    <Rect
      x="11.0469"
      y="0.25"
      width="1.90467"
      height="2.85701"
      rx="0.952337"
      fill="#9DA4AB"
    />
    <Rect
      x="17.7109"
      y="2.15234"
      width="1.90467"
      height="2.85701"
      rx="0.952337"
      transform="rotate(44.4105 17.7109 2.15234)"
      fill="#9DA4AB"
    />
    <Rect
      width="1.90467"
      height="2.85701"
      rx="0.952337"
      transform="matrix(-0.714345 0.699794 0.699794 0.714345 6.28906 2.15332)"
      fill="#9DA4AB"
    />
  </Svg>
);
