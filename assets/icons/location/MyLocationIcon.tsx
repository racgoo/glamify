import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function MyLocationIcon(props: any) {
  return (
    <Svg
      width={15}
      height={16}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#clip0_278_5926)"
        stroke="#FF6480"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M12.322 5.858c0 2.667-4.822 9.107-4.822 9.107S2.68 8.525 2.68 5.858a4.821 4.821 0 119.643 0z" />
        <Path d="M7.5 7.464a1.607 1.607 0 100-3.214 1.607 1.607 0 000 3.214z" />
      </G>
      <Defs>
        <ClipPath id="clip0_278_5926">
          <Path fill="#fff" transform="translate(0 .5)" d="M0 0H15V15H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default MyLocationIcon;
