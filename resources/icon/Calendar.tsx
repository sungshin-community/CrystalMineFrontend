import React from 'react';
import Svg, {Rect, Path, Defs, ClipPath} from 'react-native-svg';

const Calendar: React.FC = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="49"
      height="48"
      fill="none"
      viewBox="0 0 49 48">
      <Rect width="48" height="48" x="0.5" fill="#F6F6F6" rx="24" />
      <Path
        fill="#fff"
        d="M12.68 16.788a1.7 1.7 0 011.7-1.7h20.24a1.7 1.7 0 011.7 1.7v16.366a1.7 1.7 0 01-1.7 1.7H14.38a1.7 1.7 0 01-1.7-1.7V16.788z"
      />
      <Path
        fill="#CECFD6"
        fillRule="evenodd"
        d="M14.38 14.088h20.24a2.7 2.7 0 012.7 2.7v16.366a2.7 2.7 0 01-2.7 2.7H14.38a2.7 2.7 0 01-2.7-2.7V16.788a2.7 2.7 0 012.7-2.7zm0 1a1.7 1.7 0 00-1.7 1.7v16.366a1.7 1.7 0 001.7 1.7h20.24a1.7 1.7 0 001.7-1.7V16.788a1.7 1.7 0 00-1.7-1.7H14.38z"
        clipRule="evenodd"
      />
      <Path
        fill="#A055FF"
        d="M11.68 16.088a2 2 0 012-2h21.64a2 2 0 012 2v3.105H11.68v-3.105z"
      />
      <Rect
        width="3.475"
        height="2.238"
        x="16.078"
        y="21.855"
        fill="#9DA3AB"
        rx="0.6"
      />
      <Rect
        width="3.475"
        height="2.238"
        x="16.078"
        y="25.816"
        fill="#9DA3AB"
        rx="0.6"
      />
      <Rect
        width="3.475"
        height="2.238"
        x="16.078"
        y="29.775"
        fill="#9DA3AB"
        rx="0.6"
      />
      <Rect
        width="3.475"
        height="2.238"
        x="22.762"
        y="21.855"
        fill="#9DA3AB"
        rx="0.6"
      />
      <Rect
        width="3.475"
        height="2.238"
        x="22.762"
        y="25.816"
        fill="#9DA3AB"
        rx="0.6"
      />
      <Rect
        width="3.475"
        height="2.238"
        x="22.762"
        y="29.775"
        fill="#9DA3AB"
        rx="0.6"
      />
      <Rect
        width="3.475"
        height="2.238"
        x="29.445"
        y="21.855"
        fill="#9DA3AB"
        rx="0.6"
      />
      <Rect
        width="3.475"
        height="2.238"
        x="29.445"
        y="25.816"
        fill="#A055FF"
        rx="0.6"
      />
      <Rect
        width="3.475"
        height="2.238"
        x="29.445"
        y="29.775"
        fill="#9DA3AB"
        rx="0.6"
      />
      <Path
        fill="#6E7882"
        d="M17.5 15.859c0 .632.488 1.141 1.094 1.141.605 0 1.093-.51 1.093-1.141V12.89c0-.632-.488-1.141-1.093-1.141-.606 0-1.094.51-1.094 1.141v2.968zM29.313 15.859c0 .632.488 1.141 1.093 1.141.606 0 1.094-.51 1.094-1.141V12.89c0-.632-.488-1.141-1.094-1.141-.605 0-1.093.51-1.093 1.141v2.968z"
      />
    </Svg>
  );
};

export default Calendar;
