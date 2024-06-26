import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ActiveHeart(props) {
  return (
    <Svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M11.466 22.776a.746.746 0 001.068 0l9.594-9.721C26.129 9.002 23.286 2 17.596 2 14.179 2 12.611 4.511 12 4.98 11.386 4.509 9.828 2 6.404 2 .732 2-2.146 8.984 1.873 13.055z" />
    </Svg>
  )
}

export default ActiveHeart
