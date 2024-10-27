import * as React from 'react';
import Svg, {Path, Defs, Circle, Stop, LinearGradient} from 'react-native-svg';

const CrystalBall = (props: any) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M15.382 18H8.61803C8.23926 18 7.893 18.214 7.72361 18.5528L6.72361 20.5528C6.39116 21.2177 6.87465 22 7.61803 22H16.382C17.1253 22 17.6088 21.2177 17.2764 20.5528L16.2764 18.5528C16.107 18.214 15.7607 18 15.382 18Z"
      fill="#FFDF64"
    />
    <Path
      d="M17.191 21H6.80902C6.61963 21 6.4465 21.107 6.3618 21.2764C6.19558 21.6088 6.43733 22 6.80902 22H17.191C17.5627 22 17.8044 21.6088 17.6382 21.2764C17.5535 21.107 17.3804 21 17.191 21Z"
      fill="#FFC701"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.3583 18C15.6978 18 16.0347 17.9179 16.3203 17.7343C18.5338 16.3113 20 13.8269 20 11C20 6.58172 16.4183 3 12 3C7.58172 3 4 6.58172 4 11C4 13.8269 5.46625 16.3113 7.67972 17.7343C7.96535 17.9179 8.30216 18 8.64171 18H15.3583Z"
      fill="#A055FF"
    />
    <Circle
      opacity="0.4"
      cx="12.6923"
      cy="9.88588"
      r="5.45521"
      transform="rotate(23.6595 12.6923 9.88588)"
      fill="url(#paint0_linear_178_547)"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5 5.47822C5.71075 5.10156 6.27217 4.17411 6.50012 3C6.72807 4.17408 7.28947 5.10152 8.0002 5.4782C7.28947 5.85481 6.72806 6.78218 6.50008 7.9562C6.27209 6.78221 5.7107 5.85485 5 5.47822Z"
      fill="#E5D2FC"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.21069 7.00061C9.54683 8.41114 10.3741 9.52532 11.4214 9.97789C10.3741 10.4305 9.54683 11.5446 9.21069 12.9552C8.87455 11.5446 8.04727 10.4305 7 9.9779C8.04727 9.52531 8.87455 8.41114 9.21069 7.00061Z"
      fill="#E5D2FC"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_178_547"
        x1="12.6923"
        y1="4.43066"
        x2="12.6923"
        y2="15.3411"
        gradientUnits="userSpaceOnUse">
        <Stop stop-color="white" />
        <Stop offset="1" stop-color="white" stop-opacity="0" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default CrystalBall;
