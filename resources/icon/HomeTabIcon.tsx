import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import tinycolor from 'tinycolor2';

const HomeTabIcon = (props: any) => {
  const darkenColor = (color: string, amount: number) => {
    return tinycolor(color).darken(amount).toString();
  };

  const fillColor = props.color;
  const darkFillColor = darkenColor(fillColor, 7);

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="31"
      height="30"
      fill="none"
      viewBox="0 0 31 30"
      {...props}>
      <Path
        fill={darkFillColor}
        d="M8.829 11.166l2.737-2.737L10.18 7.04a.605.605 0 00-.853 0L7.44 8.925a.605.605 0 000 .854l1.388 1.387zM26.81 27.863l1.453-1.453a.923.923 0 000-1.285l-13.04-13.04-3.573-.366.835 3.103 13.04 13.04a.905.905 0 001.285 0z"></Path>
      <Path
        fill={fillColor}
        d="M21.005 1.894c-3.872.957-8.465 3.282-11.944 6.77-3.478 3.487-5.812 8.07-6.768 11.943-.15.619.61 1.05 1.068.6l6.816-6.816c.14-.14.375-.14.516 0l.768.769a.487.487 0 00.685 0l3.422-3.422a.487.487 0 000-.684l-.769-.77a.368.368 0 010-.515l6.816-6.815c.44-.45.018-1.21-.61-1.06z"></Path>
    </Svg>
  );
};

export default HomeTabIcon;
