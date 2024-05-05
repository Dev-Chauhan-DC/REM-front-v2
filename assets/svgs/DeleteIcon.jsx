import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DeleteIcon(props) {
  return (
    <Svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M13.4 12l7.3-7.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L12 10.6 4.7 3.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l7.3 7.3-7.3 7.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3l7.3-7.3 7.3 7.3c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4z" />
  </Svg>
  )
}

export default DeleteIcon
