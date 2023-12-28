import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ActiveHomeIcon = (props: any) => {
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
        d="M25.017.398a1.5 1.5 0 00-2.034 0l-19.5 18A1.5 1.5 0 003 19.5v24A4.5 4.5 0 007.5 48h33a4.5 4.5 0 004.5-4.5v-24a1.5 1.5 0 00-.483-1.102l-19.5-18zM18 28.5V45h12V28.5a1.5 1.5 0 00-1.5-1.5h-9a1.5 1.5 0 00-1.5 1.5z"
        fill="#0E1011"
      />
    </Svg>
  )
}

export default ActiveHomeIcon;
