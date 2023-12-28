import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SmallNoticeIcon = (props: any) => {
  return (
    <Svg
      width={15}
      height={16}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.5 1.75c-3.45 0-6.25 2.8-6.25 6.25s2.8 6.25 6.25 6.25 6.25-2.8 6.25-6.25-2.8-6.25-6.25-6.25zm0 9.375a.627.627 0 01-.625-.625V8c0-.344.281-.625.625-.625s.625.281.625.625v2.5a.627.627 0 01-.625.625zm.625-5h-1.25v-1.25h1.25v1.25z"
        fill="#DADCE3"
      />
    </Svg>
  )
}

export default SmallNoticeIcon;
