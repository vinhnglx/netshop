import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const HomeIcon: React.FC<SvgProps> = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M14.058 4.653a3.25 3.25 0 0 0-4.116 0L3.767 9.705a.737.737 0 0 0 .288 1.286 2.237 2.237 0 0 1 1.695 2.17V18A3.25 3.25 0 0 0 9 21.25h6A3.25 3.25 0 0 0 18.25 18v-4.839c0-1.026.699-1.921 1.695-2.17a.737.737 0 0 0 .288-1.286l-6.175-5.052ZM8.992 3.492a4.75 4.75 0 0 1 6.016 0l6.175 5.052c1.424 1.165.91 3.456-.875 3.902a.737.737 0 0 0-.558.715V18A4.75 4.75 0 0 1 15 22.75H9A4.75 4.75 0 0 1 4.25 18v-4.839a.737.737 0 0 0-.558-.715C1.906 12 1.393 9.709 2.817 8.544l6.175-5.052Z"
      clipRule="evenodd"
    />
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M12 14.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM9.25 16a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default HomeIcon;
