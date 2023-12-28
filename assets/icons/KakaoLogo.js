import * as React from "react"
import Svg, { Path } from "react-native-svg"

function KakaoLogo() {
  return (
    <Svg
      width={23}
      height={22}
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M11.499 0C17.85 0 23 4.177 23 9.33c0 5.153-5.149 9.33-11.5 9.33-.632 0-1.264-.041-1.891-.125L4.78 21.82c-.549.302-.743.27-.517-.47l.977-4.193C2.086 15.493 0 12.609 0 9.33 0 4.178 5.148 0 11.5 0h-.001z"
        fill="#5D4901"
      />
    </Svg>
  )
}

export default KakaoLogo;
