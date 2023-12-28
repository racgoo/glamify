import * as React from "react"
import Svg, { Path } from "react-native-svg"

const InActiveHomeIcon = (props: any) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.983.398a1.5 1.5 0 012.034 0l19.5 18A1.5 1.5 0 0145 19.5v21a7.5 7.5 0 01-7.5 7.5h-27A7.5 7.5 0 013 40.5v-21a1.5 1.5 0 01.483-1.102l19.5-18zM6 20.157V40.5a4.5 4.5 0 004.5 4.5H18V31.5a1.5 1.5 0 011.5-1.5h9.083a1.5 1.5 0 011.5 1.5V45H37.5a4.5 4.5 0 004.5-4.5V20.157L24 3.54 6 20.157zM27.083 45V33H21v12h6.083z"
        fill="#0E1011"
      />
    </Svg>
  )
}

export default InActiveHomeIcon;
