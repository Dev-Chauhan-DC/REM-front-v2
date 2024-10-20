import * as React from "react"
import Svg, { ClipPath, Path, G } from "react-native-svg"

function CompareIcon(props) {
  return (
    <Svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <ClipPath id="a">
      <Path d="M0 0h24v24H0z" />
    </ClipPath>
    <G clipPath="url(#a)">
      <Path
        d="M10 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v2h2V1h-2zm0 15H5l5-6zm9-15h-5v2h5v13l-5-6v9h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
       
      />
    </G>
  </Svg>
  )
}

export default CompareIcon
