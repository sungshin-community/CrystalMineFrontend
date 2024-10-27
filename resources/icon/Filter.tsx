import React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';

const Filter = (props: any) => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_361_9433)">
        <Path
          d="M8.33333 15H11.6667V13.3333H8.33333V15ZM2.5 5V6.66667H17.5V5H2.5ZM5 10.8333H15V9.16667H5V10.8333Z"
          fill="#3A424E"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_361_9433">
          <Rect width={20} height={20} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Filter;
