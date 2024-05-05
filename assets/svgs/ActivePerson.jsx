import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ActivePerson(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={20}
      viewBox="0 0 17 20"
      fill="none"
      {...props}
    >
      <Path
        d="M8.37 0C5.602 0 3.349 2.366 3.349 5.273c0 2.908 2.253 5.274 5.023 5.274 2.769 0 5.022-2.366 5.022-5.274C13.393 2.366 11.14 0 8.37 0zM14.62 13.992c-1.376-1.466-3.198-2.273-5.133-2.273H7.254c-1.934 0-3.757.807-5.132 2.273C.754 15.451 0 17.376 0 19.414c0 .324.25.586.558.586h15.625a.573.573 0 00.558-.586c0-2.038-.753-3.963-2.122-5.422z"
        fill="#2D2F32"
      />
    </Svg>
  )
}

export default ActivePerson
