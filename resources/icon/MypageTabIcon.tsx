import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import tinycolor from 'tinycolor2';

const MyPageGNB = (props: any) => {
  let fillColor = props.color;
  let darkFillColor;

  if (fillColor === '#DBDCE0') {
    darkFillColor = '#DBDCE0';
    fillColor = '#E2E4E8';
  } else if (fillColor === '#A055FF') {
    darkFillColor = '#A055FF';
    fillColor = '#C39BFA';
  } else {
    darkFillColor = tinycolor(fillColor).darken(7).toString();
  }

  return (
    <Svg
      width="24"
      height="23"
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12.4 0C13.9913 0 15.5174 0.632141 16.6427 1.75736C17.7679 2.88258 18.4 4.4087 18.4 6C18.4 7.5913 17.7679 9.11742 16.6427 10.2426C15.5174 11.3679 13.9913 12 12.4 12C10.8087 12 9.2826 11.3679 8.15738 10.2426C7.03217 9.11742 6.40002 7.5913 6.40002 6C6.40002 4.4087 7.03217 2.88258 8.15738 1.75736C9.2826 0.632141 10.8087 0 12.4 0Z"
        fill={fillColor}
      />
      <Path
        d="M12.4 14.375C18.7538 14.375 23.9 16.9481 23.9 20.125V23H0.900024V20.125C0.900024 16.9481 6.04627 14.375 12.4 14.375Z"
        fill={darkFillColor}
      />
    </Svg>
  );
};

export default MyPageGNB;
