import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Filter(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M18.438 6.563H1.563a.937.937 0 110-1.875h16.875a.937.937 0 010 1.875zm-3.125 4.375H4.687a.938.938 0 010-1.876h10.625a.937.937 0 010 1.876zm-3.75 4.374H8.437a.938.938 0 010-1.874h3.126a.938.938 0 010 1.874z"
        fill="#000"
      />
    </Svg>
  )
}

export default Filter;
