import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const ActiveCalendarIcon = (props: any) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_211_2953)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M48 4.5v15.257a4.5 4.5 0 01-1.319 3.182L24.052 45.568a7.5 7.5 0 01-10.606 0L2.43 34.553a7.5 7.5 0 010-10.606L25.06 1.318A4.5 4.5 0 0128.242 0h15.257A4.5 4.5 0 0148 4.5zM27 15a6 6 0 1012 0 6 6 0 00-12 0z"
          fill="#0E1011"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_211_2953">
          <Path fill="#fff" d="M0 0H48V48H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default ActiveCalendarIcon;
