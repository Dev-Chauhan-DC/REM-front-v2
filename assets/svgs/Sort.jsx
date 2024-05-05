import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Sort(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.293 20.293a1 1 0 011.414 0L23 24.586l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 13a1 1 0 011 1v12a1 1 0 11-2 0V14a1 1 0 011-1zM5 16a1 1 0 011-1h9a1 1 0 110 2H6a1 1 0 01-1-1zM5 8a1 1 0 011-1h17a1 1 0 110 2H6a1 1 0 01-1-1zM5 24a1 1 0 011-1h7a1 1 0 110 2H6a1 1 0 01-1-1z"
      />
    </Svg>
  )
}

export default Sort
