import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function PlayIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      {...props}
    >
      <G clipPath="url(#clip0_136_21)">
        <Path
          d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8c4.412 0 8-3.589 8-8s-3.588-8-8-8zm3.18 8.28l-4.666 3a.332.332 0 01-.34.013A.333.333 0 016 11V5a.333.333 0 01.514-.28l4.666 3a.334.334 0 010 .56z"
      
        />
      </G>
      <Defs>
        <ClipPath id="clip0_136_21">
          <Path  d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default PlayIcon
