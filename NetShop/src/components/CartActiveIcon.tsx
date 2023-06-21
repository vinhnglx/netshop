import * as React from 'react';
import Svg, {Circle, Path, Rect, SvgProps} from 'react-native-svg';

const CartActiveIcon: React.FC<SvgProps> = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={44}
    fill="none"
    {...props}>
    <Rect width={44} height={44} fill="#fff" rx={22} />
    <Path
      stroke="#1A2530"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M26 16a4 4 0 0 0-8 0"
    />
    <Path
      stroke="#1A2530"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.562 19.504A4 4 0 0 1 18.532 16h6.937a4 4 0 0 1 3.969 3.504l1 8A4 4 0 0 1 26.468 32h-8.937a4 4 0 0 1-3.969-4.496l1-8Z"
    />
    <Path
      stroke="#1A2530"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19 26c2.356 1.34 3.648 1.326 6 0"
    />
    <Circle cx={38} cy={7} r={4} fill="#F87265" />
  </Svg>
);

export default CartActiveIcon;
