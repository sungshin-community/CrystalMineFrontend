import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

const Scrap = (props: any) => (
  <Svg
    width="14"
    height="18"
    viewBox="0 0 14 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M12 0H2C0.9 0 0.0100002 0.9 0.0100002 2L0 18L7 15L14 18V2C14 0.9 13.1 0 12 0Z"
      fill="#A055FF"
    />
  </Svg>
);

export default Scrap;

export const NoScrap = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={18}
    fill="none"
    {...props}>
    <Path
      stroke="#9DA4AB"
      strokeWidth={1.5}
      d="M.76 2C.76 1.31 1.32.75 2 .75h10c.686 0 1.25.564 1.25 1.25v14.863L7.295 14.31 7 14.184l-.295.127L.75 16.862.76 2Z"
    />
  </Svg>
);

interface ScrapIconProps {
  fill?: string;
  stroke?: string;
}

export const FooterScrap = ({
  fill = 'none',
  stroke = '#9DA4AB',
}: ScrapIconProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill={fill}>
      <G clip-path="url(#clip0_1431_29478)">
        <Path
          d="M5.76 5.00047V5C5.76 4.30931 6.3191 3.75 7 3.75H17C17.6858 3.75 18.25 4.31421 18.25 5V19.8626L12.2954 17.3106L12 17.184L11.7046 17.3106L5.75071 19.8623L5.76 5.00047Z"
          stroke={stroke}
          stroke-width="1.5"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1431_29478">
          <Rect width="24" height="24" fill={fill} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
