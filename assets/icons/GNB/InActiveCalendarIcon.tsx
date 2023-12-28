import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const InActiveCalendarIcon = (props: any) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#clip0_211_2922)"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#0E1011"
      >
        <Path d="M39 15a6 6 0 10-12 0 6 6 0 0012 0zm-6-3a3 3 0 110 6 3 3 0 010-6z" />
        <Path d="M48 19.757V4.5A4.5 4.5 0 0043.5 0H28.242a4.5 4.5 0 00-3.181 1.318L2.43 23.947a7.5 7.5 0 000 10.606l11.015 11.015a7.5 7.5 0 0010.607 0l22.629-22.629A4.5 4.5 0 0048 19.757zM45 4.5v15.257a1.5 1.5 0 01-.44 1.061L21.932 43.447a4.5 4.5 0 01-6.364 0L4.553 32.432a4.5 4.5 0 010-6.364L27.182 3.439A1.5 1.5 0 0128.242 3H43.5A1.5 1.5 0 0145 4.5z" />
      </G>
      <Defs>
        <ClipPath id="clip0_211_2922">
          <Path fill="#fff" d="M0 0H48V48H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default InActiveCalendarIcon;
