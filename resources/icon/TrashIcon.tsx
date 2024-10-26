import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const BlackTrashIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    {...props}>
    <Path
      fill="#3A424E"
      d="M14 10.25a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75ZM10 17.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75Z"
    />
    <Path
      fill="#3A424E"
      fillRule="evenodd"
      d="M16.75 4.25a2 2 0 0 0-2-2h-5.5a2 2 0 0 0-2 2 2 2 0 0 1-2 2h-1.5a.75.75 0 0 0 0 1.5h1.5v12a2 2 0 0 0 2 2h9.5a2 2 0 0 0 2-2v-12h1.5a.75.75 0 0 0 0-1.5h-1.5a2 2 0 0 1-2-2Zm-2.5 2a1 1 0 0 0 1-1v-.5a1 1 0 0 0-1-1h-4.5a1 1 0 0 0-1 1v.5a1 1 0 0 0 1 1h4.5Zm-7.5 1.5v11.5a1 1 0 0 0 1 1h8.5a1 1 0 0 0 1-1V7.75H6.75Z"
      clipRule="evenodd"
    />
  </Svg>
);

const TrashIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="#9DA4AB"
      d="M14 10.25a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75ZM10 17.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75Z"
    />
    <Path
      fill="#9DA4AB"
      fillRule="evenodd"
      d="M16.75 4.25a2 2 0 0 0-2-2h-5.5a2 2 0 0 0-2 2 2 2 0 0 1-2 2h-1.5a.75.75 0 0 0 0 1.5h1.5v12a2 2 0 0 0 2 2h9.5a2 2 0 0 0 2-2v-12h1.5a.75.75 0 0 0 0-1.5h-1.5a2 2 0 0 1-2-2Zm-2.5 2a1 1 0 0 0 1-1v-.5a1 1 0 0 0-1-1h-4.5a1 1 0 0 0-1 1v.5a1 1 0 0 0 1 1h4.5Zm-7.5 1.5v11.5a1 1 0 0 0 1 1h8.5a1 1 0 0 0 1-1V7.75H6.75Z"
      clipRule="evenodd"
    />
  </Svg>
);

export {TrashIcon, BlackTrashIcon};
