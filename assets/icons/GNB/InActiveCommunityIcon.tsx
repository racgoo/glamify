import * as React from "react"
import Svg, { Path } from "react-native-svg"

const InActiveCommunityIcon = (props: any) => {
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
        d="M0 19.5C0 10.387 7.387 3 16.5 3h15C40.613 3 48 10.387 48 19.5v3C48 31.613 40.613 39 31.5 39h-15c-.755 0-1.5-.05-2.23-.15L6 47.121V35.228A16.469 16.469 0 010 22.5v-3zM16.5 6C9.044 6 3 12.044 3 19.5v3c0 4.416 2.118 8.336 5.4 10.802l.6.45v6.127l4.249-4.249.775.144c.802.148 1.63.226 2.476.226h15C38.956 36 45 29.956 45 22.5v-3C45 12.044 38.956 6 31.5 6h-15z"
        fill="#0E1011"
      />
    </Svg>
  )
}

export default InActiveCommunityIcon;
