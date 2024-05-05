import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ActiveSearch(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M19.81 18.912l-5.163-5.081a8.168 8.168 0 002.183-5.55C16.83 3.707 13.062 0 8.415 0 3.767 0 0 3.707 0 8.28c0 4.574 3.767 8.281 8.415 8.281 2.008 0 3.85-.694 5.296-1.849l5.184 5.101a.654.654 0 00.915 0 .63.63 0 000-.901zM8.416 15.287c-3.933 0-7.12-3.137-7.12-7.006 0-3.87 3.187-7.007 7.12-7.007 3.932 0 7.12 3.137 7.12 7.007 0 3.87-3.188 7.006-7.12 7.006z"
        fill="#2D2F32"
      />
      <Path
        d="M14.38 8.328a5.953 5.953 0 11-11.906 0 5.953 5.953 0 0111.907 0z"
        fill="#2D2F32"
      />
    </Svg>
  )
}

export default ActiveSearch
