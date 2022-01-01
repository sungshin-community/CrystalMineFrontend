import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const MyPostingIcon = (props: any) => (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.444 5H6.556C5.7 5 5 5.7 5 6.556v10.888C5 18.3 5.7 19 6.556 19h10.888C18.3 19 19 18.3 19 17.444V6.556C19 5.7 18.3 5 17.444 5Zm-4.666 10.889h-3.89a.78.78 0 0 1-.777-.778.78.78 0 0 1 .778-.778h3.889a.78.78 0 0 1 .778.778.78.78 0 0 1-.778.778Zm2.333-3.111H8.89A.78.78 0 0 1 8.11 12a.78.78 0 0 1 .778-.778h6.222a.78.78 0 0 1 .778.778.78.78 0 0 1-.778.778Zm0-3.111H8.89a.78.78 0 0 1-.778-.778.78.78 0 0 1 .778-.778h6.222a.78.78 0 0 1 .778.778.78.78 0 0 1-.778.778Z"
        fill="#575757"
      />
    </Svg>
  );
  

export const MyCommentIcon = (props: any) => (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="m12.203 16.876-.203-.09-.203.09L6.5 19.231V5.778c0-.72.565-1.278 1.214-1.278h8.572c.65 0 1.214.559 1.214 1.278V19.23l-5.297-2.355Z"
        fill="#575757"
        stroke="#575757"
      />
      <Path
        d="M15 7H9"
        stroke="#F6F6F6"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

export const ScrapPostingIcon = (props: any) => (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.6 5H6.4C5.63 5 5 5.63 5 6.4V19l2.8-2.8h9.8c.77 0 1.4-.63 1.4-1.4V6.4c0-.77-.63-1.4-1.4-1.4Z"
        fill="#575757"
      />
      <Path
        d="M9 8v5h5"
        stroke="#F6F6F6"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

export default MyPostingIcon;
