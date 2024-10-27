import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

const Siren = (props: any) => {
  return (
    <Svg
      width="18"
      height="21"
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M3.15962 11.6791C3.15962 8.45115 5.77635 5.83442 9.00425 5.83442C12.2322 5.83442 14.8489 8.45115 14.8489 11.6791V15.8571H3.15962V11.6791Z"
        stroke="#9DA4AB"
        stroke-width="1.64346"
      />
      <Path
        d="M1.25337 17.3926C1.25337 16.7947 1.73806 16.31 2.33596 16.31H15.6694C16.2673 16.31 16.752 16.7947 16.752 17.3926V18.3456C16.752 18.9435 16.2673 19.4282 15.6694 19.4282H2.33596C1.73806 19.4282 1.25337 18.9435 1.25337 18.3456V17.3926Z"
        stroke="#9DA4AB"
        stroke-width="1.64346"
        stroke-linejoin="round"
      />
      <Rect
        x="8.05078"
        y="0.25"
        width="1.90467"
        height="2.85701"
        rx="0.952337"
        fill="#9DA4AB"
      />
      <Rect
        x="14.7148"
        y="2.15234"
        width="1.90467"
        height="2.85701"
        rx="0.952337"
        transform="rotate(44.4105 14.7148 2.15234)"
        fill="#9DA4AB"
      />
      <Rect
        width="1.90467"
        height="2.85701"
        rx="0.952337"
        transform="matrix(-0.714345 0.699794 0.699794 0.714345 3.28906 2.15332)"
        fill="#9DA4AB"
      />
    </Svg>
  );
};

export default Siren;
