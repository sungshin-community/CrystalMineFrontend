import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import React from 'react';
const Mark = (props: any) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clip-path="url(#clip0_871_11794)">
        <Path
          d="M5.76 5.00047V5C5.76 4.30931 6.3191 3.75 7 3.75H17C17.6858 3.75 18.25 4.31421 18.25 5V19.8626L12.2954 17.3106L12 17.184L11.7046 17.3106L5.75071 19.8623L5.76 5.00047Z"
          stroke="#9DA4AB"
          stroke-width="1.5"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_871_11794">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Mark;
