import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const ProfileImage = (props: any) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={12} cy={12} r={12} fill="#6E7882" />
    <Path
      d="M12 6.429a2.786 2.786 0 1 1 0 5.57 2.786 2.786 0 0 1 0-5.57Zm0 6.964c3.078 0 5.572 1.246 5.572 2.786v1.392H6.429V16.18c0-1.54 2.493-2.786 5.571-2.786Z"
      fill="#fff"
    />
  </Svg>
);

export default ProfileImage;
