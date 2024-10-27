import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const MessageChatIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="#3A424E"
      fillRule="evenodd"
      d="M3 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v1.69a3 3 0 0 1 3 3v8.492a1 1 0 0 1-1.536.844L17.27 18H9a2 2 0 0 1-2-2v-1.5l-2.444 1.636A1 1 0 0 1 3 15.306V6Zm4 6.078V10.69a3 3 0 0 1 3-3h7V6.5A1.5 1.5 0 0 0 15.5 5h-9A1.5 1.5 0 0 0 5 6.5v7.27l2-1.692ZM10 16a1 1 0 0 1-1-1v-3.804a1.5 1.5 0 0 1 1.5-1.5h8a1.5 1.5 0 0 1 1.5 1.5V17.5L17.73 16H10Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default MessageChatIcon;
