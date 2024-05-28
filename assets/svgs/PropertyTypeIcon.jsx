import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function PropertyTypeIcon(props) {
  return (
      <Svg
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 24 24"
          {...props}
      >
        <Path d="M23.045 8.035L21 6.428V2h-1v3.641L13.545.567a2.494 2.494 0 00-3.09 0l-9.5 7.468A2.484 2.484 0 000 10v14h8v-9.5c0-.827.673-1.5 1.5-1.5h5c.827 0 1.5.673 1.5 1.5V24h8V10c0-.772-.348-1.489-.955-1.965zM23 23h-6v-8.5c0-1.378-1.121-2.5-2.5-2.5h-5A2.503 2.503 0 007 14.5V23H1V10c0-.463.209-.893.572-1.179l9.5-7.468a1.498 1.498 0 011.855 0l9.5 7.468c.363.286.572.716.572 1.179v13z" />
      </Svg>
  )
}

export default PropertyTypeIcon
