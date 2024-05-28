import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DaysOnAppIcon(props) {
  return (
      <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          {...props}
      >
        <Path d="M19.5 2H18V.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5V2H7V.5c0-.28-.22-.5-.5-.5S6 .22 6 .5V2H4.5C2.02 2 0 4.02 0 6.5v13C0 21.98 2.02 24 4.5 24h15c2.48 0 4.5-2.02 4.5-4.5v-13C24 4.02 21.98 2 19.5 2zm-8 7v4H7V9h4.5zM17 9v4h-4.5V9H17zm6 0v4h-5V9h5zM6 13H1V9h5v4zm-5 1h5v4H1v-4zm6 0h4.5v4H7v-4zm4.5 5v4H7v-4h4.5zm1 0H17v4h-4.5v-4zm0-1v-4H17v4h-4.5zm5.5-4h5v4h-5v-4zM4.5 3h15C21.43 3 23 4.57 23 6.5V8H1V6.5C1 4.57 2.57 3 4.5 3zM1 19.5V19h5v4H4.5C2.57 23 1 21.43 1 19.5zM19.5 23H18v-4h5v.5c0 1.93-1.57 3.5-3.5 3.5z" />
      </Svg>
  )
}

export default DaysOnAppIcon
