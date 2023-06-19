import React from 'react';
import Svg, {Path, Rect, SvgProps} from 'react-native-svg';

export const BackIcon: React.FC<SvgProps> = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={44}
    fill="none"
    {...props}>
    <Rect width={44} height={44} fill="#fff" rx={22} />
    <Path
      fill="#1A2530"
      fillRule="evenodd"
      d="M24.468 16.414a.75.75 0 0 1 .118 1.054L20.96 22l3.626 4.531a.75.75 0 1 1-1.172.937l-4-5a.75.75 0 0 1 0-.937l4-5a.75.75 0 0 1 1.054-.117Z"
      clipRule="evenodd"
    />
  </Svg>
);
