import React from 'react';
import Svg, {Path} from 'react-native-svg';

const PinkN = (props: any) => {
  return (
    <Svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M3 9.75C3 10.1642 3.33579 10.5 3.75 10.5C4.16421 10.5 4.5 10.1642 4.5 9.75V6.75V3.75H4.51458L6.68507 8.09189L7.64644 9.90613C7.84005 10.2715 8.21972 10.5 8.63323 10.5C9.25 10.5 9.75 10 9.75 9.38323V2.25C9.75 1.83579 9.41421 1.5 9 1.5C8.58579 1.5 8.25 1.83579 8.25 2.25V5.25V8.25L5.11189 2.1088C4.92095 1.73514 4.53673 1.5 4.11712 1.5C3.50015 1.5 3 2.00015 3 2.61712V9.75Z"
        fill="#FF6376"
      />
    </Svg>
  );
};

export default PinkN;
