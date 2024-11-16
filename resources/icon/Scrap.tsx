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
    width="14"
    height="18"
    viewBox="0 0 14 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M0.76 2.00047V2C0.76 1.30931 1.3191 0.75 2 0.75H12C12.6858 0.75 13.25 1.31421 13.25 2V16.8626L7.29544 14.3106L7 14.184L6.70456 14.3106L0.750711 16.8623L0.76 2.00047Z"
      stroke="#9DA4AB"
      stroke-width="1.5"
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
