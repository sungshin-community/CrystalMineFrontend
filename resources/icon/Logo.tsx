import * as React from 'react';
import Svg, {SvgProps, Path, Defs, Pattern, Use, Image} from 'react-native-svg';

export default function Logo(props: any) {
  return (
    <Svg
      width={88}
      height={88}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M44 0C19.698 0 0 19.698 0 44s19.698 44 44 44 44-19.698 44-44S68.302 0 44 0zm28.774 42.068l-10.88-10.886v20.843h-3.305v-20.55l-19.565 19.56-2.335-2.336L55.97 29.416H35.654v-3.304h21.159L45.655 14.95l2.335-2.336 10.6 10.593V12.73h3.303V23.5l7.865-7.865 2.336 2.336-8.142 8.141H75v3.304H64.793L75.11 39.733l-2.336 2.335z"
        fill="#A055FF"
      />
    </Svg>
  );
}

export const SmallLogo = (props: any) => (
  <Svg
    width={28}
    height={28}
    viewBox="0 0 30 30" // viewBox 추가
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M15 .333C6.9.333.333 6.9.333 15 .333 23.1 6.9 29.667 15 29.667c8.101 0 14.667-6.566 14.667-14.667C29.667 6.9 23.1.333 15 .333Zm9.592 14.154-3.535-3.537v6.817H19.77v-6.72l-6.43 6.427-.909-.91 6.335-6.335h-6.641V8.943h6.922L15.42 5.316l.91-.91 3.44 3.44V4.484h1.286v3.46l2.53-2.53.909.91-2.622 2.621h3.55v1.286h-3.271l3.346 3.347-.907.909Z"
      fill="#A055FF"
    />
  </Svg>
);
