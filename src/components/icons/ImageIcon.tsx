import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

function ImageIcon() {
  return (
    <Svg width="40px" height="40x" viewBox="0 0 24 24" fill="none">
      <Path fill="#fff" d="M0 0H24V24H0z" />
      <Path
        d="M21 16v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-2m18-2V4a1 1 0 00-1-1H4a1 1 0 00-1 1v14m18-2l-5.517-3.678a1 1 0 00-1.002-.063L3 18"
        stroke="#ff6900"
        strokeLinejoin="round"
      />
      <Circle cx={8} cy={9} r={2} stroke="#ff6900" strokeLinejoin="round" />
    </Svg>
  );
}

export default ImageIcon;
