import React from 'react';
import Svg, {Rect, Path, Defs, ClipPath} from 'react-native-svg';

const Notice: React.FC = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="49"
      height="48"
      fill="none"
      viewBox="0 0 49 48">
      <Rect width="48" height="48" x="0.75" fill="#F6F6F6" rx="24" />
      <Defs>
        <ClipPath id="clip0_1431_46679">
          <Rect width="28" height="28" x="10.75" y="10" fill="#fff" />
        </ClipPath>
      </Defs>
      <Path
        fill="#fff"
        d="M12.61 16.788a1.7 1.7 0 011.7-1.7h20.24a1.7 1.7 0 011.7 1.7v18.065H14.31a1.7 1.7 0 01-1.7-1.7V16.789z"
      />
      <Rect
        width="19.18"
        height="1.282"
        x="14.84"
        y="17.402"
        fill="#A055FF"
        rx="0.641"
      />
      <Path
        fill="#9DA3AB"
        fillRule="evenodd"
        d="M15.34 21.178a.5.5 0 000 1h18.18a.5.5 0 100-1H15.34zm11.349 3.494a.5.5 0 100 1h6.832a.5.5 0 100-1h-6.832zm-.5 3.994a.5.5 0 01.5-.5h6.832a.5.5 0 110 1h-6.832a.5.5 0 01-.5-.5zm.5 2.994a.5.5 0 100 1h6.832a.5.5 0 100-1h-6.832z"
        clipRule="evenodd"
      />
      <Rect
        width="9.591"
        height="7.922"
        x="14.84"
        y="24.74"
        fill="#B175FD"
        rx="1"
      />
      <Path
        fill="#CECFD6"
        fillRule="evenodd"
        d="M36.25 12.588a2.5 2.5 0 012.5 2.5v19.164a1.6 1.6 0 01-1.5 1.596v.005H14.31a2.7 2.7 0 01-2.7-2.7V16.789a2.7 2.7 0 012.7-2.7h.554a1.8 1.8 0 011.775-1.5H36.25zm0 22.265V16.788a1.7 1.7 0 00-1.7-1.7H14.31a1.7 1.7 0 00-1.7 1.7v16.366a1.7 1.7 0 001.7 1.7h21.94z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default Notice;
