import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import tinycolor from 'tinycolor2';

const AlertTabIcon = (props: any) => {
  const darkenColor = (color: string, amount: number) => {
    return tinycolor(color).darken(amount).toString();
  };

  const fillColor = props.color;
  const darkFillColor = darkenColor(fillColor, 10);

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="none"
      viewBox="0 0 28 28"
      {...props}>
      <Path
        fill={darkFillColor}
        d="M10.938 24.063c.392 1.261 1.607 2.187 3.062 2.187 1.455 0 2.67-.926 3.063-2.188h-6.125zM14 5.731c-.604 0-1.094-.49-1.094-1.093V2.844a1.094 1.094 0 012.188 0v1.794c0 .603-.49 1.093-1.094 1.093z"></Path>
      <Path
        fill={fillColor}
        d="M24.15 19.988c-.84-.677-1.348-1.686-1.557-2.757l-1.514-7.787C20.405 5.994 17.448 3.509 14 3.5c-3.447.009-6.405 2.493-7.079 5.944L5.407 17.23c-.21 1.07-.717 2.08-1.557 2.756a3.31 3.31 0 00-1.225 2.582v1.08c0 .473.376.851.831.851h21.088a.836.836 0 00.831-.852v-1.08a3.31 3.31 0 00-1.225-2.58z"></Path>
    </Svg>
  );
};

export default AlertTabIcon;
