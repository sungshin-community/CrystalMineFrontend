import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
const BigSearchIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={74}
    height={74}
    fill="none"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#DBDCE0"
        d="M49.946 45.041h-2.572l-.912-.878c3.907-4.555 5.925-10.77 4.818-17.374-1.53-9.045-9.082-16.268-18.198-17.374-13.77-1.692-25.36 9.89-23.667 23.653 1.107 9.11 8.334 16.659 17.384 18.188 6.609 1.106 12.827-.911 17.384-4.816l.88.912v2.57L58.897 63.75a3.44 3.44 0 0 0 4.85 0 3.435 3.435 0 0 0 0-4.848l-13.802-13.86Zm-19.533 0c-8.106 0-14.65-6.54-14.65-14.64 0-8.102 6.544-14.642 14.65-14.642 8.106 0 14.65 6.54 14.65 14.641 0 8.102-6.544 14.641-14.65 14.641Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h74v74H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default BigSearchIcon;
