import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const HomeGNB = (props: any) => (
  <Svg
    width={26}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M10.329 22.306v-6.914h5.442v6.914c0 .76.612 1.382 1.36 1.382h4.082c.748 0 1.36-.622 1.36-1.382v-9.68h2.313c.626 0 .925-.787.449-1.202L13.96 1.012a1.354 1.354 0 0 0-1.823 0L.765 11.424c-.463.415-.177 1.203.449 1.203h2.313v9.679c0 .76.612 1.382 1.36 1.382h4.081c.749 0 1.36-.622 1.36-1.382Z"
      fill="#000"
    />
  </Svg>
);

export default HomeGNB;
