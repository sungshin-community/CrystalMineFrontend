import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const AlertGNB = (props: any) => (
  <Svg
    width={20}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M9.895 25.61c1.427 0 2.593-1.149 2.593-2.552H7.302c0 1.403 1.154 2.551 2.593 2.551Zm7.78-7.653v-6.378c0-3.915-2.127-7.193-5.835-8.06V2.65c0-1.058-.869-1.913-1.945-1.913s-1.944.855-1.944 1.913v.868c-3.721.867-5.835 4.132-5.835 8.06v6.378L.444 19.602c-.817.803-.247 2.181.907 2.181h17.075c1.154 0 1.738-1.378.92-2.181l-1.672-1.645Z"
      fill={props.color}
    />
  </Svg>
);

export default AlertGNB;
