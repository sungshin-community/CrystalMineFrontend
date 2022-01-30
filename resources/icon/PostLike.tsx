import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const PostLike = (props: any) => (
  <Svg
    width={14}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M12.36.674C10.513-.55 8.232.02 7 1.422 5.77.02 3.488-.558 1.64.674A3.695 3.695 0 0 0 .003 3.59c-.098 2.638 2.309 4.753 5.983 7.997l.07.06c.531.47 1.35.47 1.882-.006l.077-.068c3.673-3.237 6.073-5.351 5.982-7.99A3.693 3.693 0 0 0 12.36.674Z"
      fill="#FF6060"
    />
  </Svg>
);

export default PostLike;
