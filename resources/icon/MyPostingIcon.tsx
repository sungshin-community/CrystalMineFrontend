import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const MyPostingIcon = (props: any) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10.5 1.5h-6c-.825 0-1.493.675-1.493 1.5L3 15c0 .825.667 1.5 1.492 1.5H13.5c.825 0 1.5-.675 1.5-1.5V6l-4.5-4.5Zm1.5 12H6V12h6v1.5Zm0-3H6V9h6v1.5ZM9.75 6.75V2.625l4.125 4.125H9.75Z"
      fill="#333D4B"
    />
  </Svg>
  );
  

export const MyCommentIcon = (props: any) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M16.492 3c0-.825-.667-1.5-1.492-1.5H3c-.825 0-1.5.675-1.5 1.5v9c0 .825.675 1.5 1.5 1.5h10.5l3 3L16.492 3ZM13.5 10.5h-9V9h9v1.5Zm0-2.25h-9v-1.5h9v1.5Zm0-2.25h-9V4.5h9V6Z"
      fill="#333D4B"
    />
  </Svg>
  );

export const ScrapPostingIcon = (props: any) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12.75 2.25h-7.5c-.825 0-1.493.675-1.493 1.5l-.007 12L9 13.5l5.25 2.25v-12c0-.825-.675-1.5-1.5-1.5Z"
      fill="#333D4B"
    />
  </Svg>
  );

export default MyPostingIcon;
