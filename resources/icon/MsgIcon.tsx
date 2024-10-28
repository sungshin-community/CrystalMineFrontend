import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import React from 'react';

const MsgIcon = (props: any) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M4.875 5.25H19.875C20.492 5.25 21 5.75796 21 6.375V17.625C21 18.242 20.492 18.75 19.875 18.75H4.875C4.25796 18.75 3.75 18.242 3.75 17.625V6.375C3.75 5.75796 4.25796 5.25 4.875 5.25Z"
        stroke="#9DA4AB"
        stroke-width="1.5"
      />
      <Path
        d="M12.9711 11.6825L12.9686 11.684C12.8347 11.7685 12.6882 11.822 12.5385 11.8445L12.7727 11.698L19.0501 7.77228C19.0651 7.76338 19.0739 7.76274 19.0784 7.7627C19.0854 7.76264 19.0945 7.76451 19.1037 7.7696C19.1129 7.77467 19.1179 7.78054 19.1202 7.7842L19.1203 7.78432C19.1213 7.78607 19.125 7.79201 19.125 7.80901C19.125 7.81477 19.1237 7.82098 19.1198 7.82798C19.116 7.83478 19.1092 7.84331 19.0973 7.85124L12.9711 11.6825ZM11.9773 11.698L12.2115 11.8445C12.0618 11.822 11.9153 11.7685 11.7814 11.684L11.7789 11.6825L5.65265 7.85123C5.64081 7.8433 5.634 7.83478 5.63023 7.82798C5.62634 7.82098 5.625 7.81477 5.625 7.80901C5.625 7.79201 5.62866 7.78607 5.62974 7.78432C5.62977 7.78428 5.62979 7.78424 5.62981 7.7842C5.63206 7.78054 5.63711 7.77467 5.64629 7.7696C5.65552 7.76451 5.66461 7.76264 5.67157 7.7627C5.67614 7.76274 5.68492 7.76338 5.69988 7.77228L11.9773 11.698Z"
        stroke="#9DA4AB"
        stroke-width="1.5"
      />
    </Svg>
  );
};

export default MsgIcon;
