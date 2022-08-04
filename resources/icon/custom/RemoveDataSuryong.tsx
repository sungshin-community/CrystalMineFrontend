import * as React from "react"
import Svg, {
  SvgProps,
  Defs,
  ClipPath,
  Circle,
  Path,
  G,
  Rect,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter, style */

const RemoveDataSuryong = (props: SvgProps) => (
  <Svg
    id="a"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 350 350"
    {...props}
  >
    <Defs>
      <ClipPath id="b">
        <Circle className="l" cx={175} cy={196.89} r={135} />
      </ClipPath>
    </Defs>
    <Path className="l" d="M0 0h350v350H0z" />
    <G
      style={{
        clipPath: "url(#b)",
      }}
    >
      <Circle
        cx={175}
        cy={179.44}
        r={186.29}
        style={{
          fill: "#b6d0ff",
        }}
      />
      <Path
        style={{
          fill: "#89abef",
        }}
        d="M50.85 274.22h248.3v106.67H50.85z"
      />
      <Path
        className="e"
        d="M175 264.98h-13.87c-39.4 0-71.34-31.94-71.34-71.34 0-39.4 31.94-71.34 71.34-71.34H175"
      />
      <Rect
        className="e"
        x={127.41}
        y={96.88}
        width={17.23}
        height={44.5}
        rx={8.61}
        ry={8.61}
        transform="rotate(163.75 136.023 119.136)"
      />
      <Rect
        className="e"
        x={120.8}
        y={107.84}
        width={11.05}
        height={20.86}
        rx={5.53}
        ry={5.53}
        transform="rotate(73.75 126.322 118.271)"
      />
      <Rect
        className="k"
        x={132.07}
        y={111.01}
        width={30.4}
        height={16.25}
        rx={8.13}
        ry={8.13}
        transform="rotate(78.42 147.269 119.149)"
      />
      <Rect
        className="k"
        x={94.68}
        y={143.11}
        width={30.4}
        height={16.25}
        rx={8.13}
        ry={8.13}
        transform="rotate(33.6 109.882 151.233)"
      />
      <Rect
        className="k"
        x={105.21}
        y={211.29}
        width={17.35}
        height={9.75}
        rx={4.88}
        ry={4.88}
        transform="rotate(-23.71 113.866 216.139)"
      />
      <Path
        className="e"
        d="M175 264.98h13.87c39.4 0 71.34-31.94 71.34-71.34 0-39.4-31.94-71.34-71.34-71.34H175"
      />
      <Rect
        className="e"
        x={205.37}
        y={96.88}
        width={17.23}
        height={44.5}
        rx={8.61}
        ry={8.61}
        transform="rotate(16.25 213.988 119.148)"
      />
      <Rect
        className="e"
        x={218.15}
        y={107.84}
        width={11.05}
        height={20.86}
        rx={5.53}
        ry={5.53}
        transform="rotate(106.25 223.673 118.272)"
      />
      <Rect
        className="k"
        x={187.53}
        y={111.01}
        width={30.4}
        height={16.25}
        rx={8.13}
        ry={8.13}
        transform="rotate(101.58 202.734 119.125)"
      />
      <Rect
        className="k"
        x={224.92}
        y={143.11}
        width={30.4}
        height={16.25}
        rx={8.13}
        ry={8.13}
        transform="rotate(146.4 240.122 151.24)"
      />
      <Rect
        className="k"
        x={227.44}
        y={211.29}
        width={17.35}
        height={9.75}
        rx={4.88}
        ry={4.88}
        transform="rotate(-156.29 236.116 216.166)"
      />
      <Path d="M154.28 209.61h-19.96c-6.22 0-11.5-4.54-12.43-10.68l-1.98-13.06c-1.16-7.61 4.73-14.46 12.43-14.46h23.93c7.7 0 13.59 6.85 12.43 14.46l-1.98 13.06c-.93 6.14-6.22 10.68-12.43 10.68ZM215.68 209.61h-19.96c-6.22 0-11.5-4.54-12.43-10.68l-1.98-13.06c-1.16-7.61 4.73-14.46 12.43-14.46h23.93c7.7 0 13.59 6.85 12.43 14.46l-1.98 13.06c-.93 6.14-6.22 10.68-12.43 10.68Z" />
      <Path d="M153.11 183.76h43.79v6.75h-43.79z" />
      <Rect
        className="p"
        x={77.62}
        y={213.48}
        width={195.27}
        height={82.09}
        rx={15.47}
        ry={15.47}
      />
      <Path
        d="M272.9 264.44v15.66c0 8.54-6.93 15.47-15.47 15.47H93.09c-8.54 0-15.47-6.93-15.47-15.47v-15.66"
        style={{
          fill: "#4d4d4d",
        }}
      />
      <Path
        className="o"
        d="M104.85 279.32h10.37v73h-10.37zM235.3 279.32h10.37v73H235.3zM218.99 279.32h10.37v73h-10.37zM202.69 279.32h10.37v73h-10.37zM186.38 279.32h10.37v73h-10.37zM170.07 279.32h10.37v73h-10.37zM153.77 279.32h10.37v73h-10.37zM137.46 279.32h10.37v73h-10.37zM121.16 279.32h10.37v73h-10.37z"
      />
      <Path
        d="M118.78 156.31h112.96c7.69 0 13.93 6.24 13.93 13.93v43.25H104.85v-43.25c0-7.69 6.24-13.93 13.93-13.93Z"
        style={{
          fill: "#eaeaea",
        }}
      />
      <Rect
        className="e"
        x={51.06}
        y={226.84}
        width={39.06}
        height={58.04}
        rx={19.53}
        ry={19.53}
      />
      <Rect
        className="e"
        x={259.88}
        y={226.84}
        width={39.06}
        height={58.04}
        rx={19.53}
        ry={19.53}
        transform="rotate(180 279.41 255.865)"
      />
      <Path
        className="p"
        d="M237.61 205.85h7.78c2.36 0 4.28 1.92 4.28 4.28v5.67c0 .52-.42.94-.94.94h-14.44c-.52 0-.94-.42-.94-.94v-5.67c0-2.36 1.92-4.28 4.28-4.28ZM214.5 205.85h7.78c2.36 0 4.28 1.92 4.28 4.28v5.67c0 .52-.42.94-.94.94h-14.44c-.52 0-.94-.42-.94-.94v-5.67c0-2.36 1.92-4.28 4.28-4.28Z"
      />
    </G>
    <G
      style={{
        filter: "url(#c)",
      }}
    >
      <Rect
        className="e"
        x={131.44}
        y={20.94}
        width={87.11}
        height={55.56}
        rx={27.78}
        ry={27.78}
      />
      <Path
        className="e"
        d="M175 68.45h-4.2c-2.26 0-3.87 2.2-3.18 4.36l4.2 13.16c.99 3.1 5.38 3.1 6.37 0l4.2-13.16c.69-2.16-.92-4.36-3.18-4.36h-4.2Z"
      />
    </G>
    <Path
      style={{
        stroke: "#3aaf77",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 9,
        fill: "none",
      }}
      d="m158.11 43.44 12.98 12.98 20.8-20.8"
    />
  </Svg>
)

export default RemoveDataSuryong
