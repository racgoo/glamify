import * as React from "react"
import Svg, { Path } from "react-native-svg"

const TextDeleteIcon = (props: any) => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
        stroke="#000"
        strokeWidth={2}
      />
      <Path
        d="M9 9l6 6m0-6l-6 6"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default TextDeleteIcon
