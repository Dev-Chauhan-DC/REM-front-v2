import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ShoppingCenterIcon(props) {
  return (
    <Svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M62 7H38.724l-.734-5.142A1 1 0 0037 1H27a1 1 0 00-.99.858L25.276 7H2a1 1 0 00-1 1v14a1 1 0 001 1h3v39a1 1 0 001 1h52a1 1 0 001-1V23h3a1 1 0 001-1V8a1 1 0 00-1-1zM27.867 3h8.266l1.714 12H26.153zM7 27h50v14H7zm20 34h-6V47h6zm-8 0h-6V47h6zm32 0h-6V47h6zm-8 0h-6V47h6zm10 0V46a1 1 0 00-1-1H36a1 1 0 00-1 1v15h-6V46a1 1 0 00-1-1H12a1 1 0 00-1 1v15H7V43h50v18zm4-36H7v-2h50zm4-4H3V9h21.99l-.98 6.858A1 1 0 0025 17h14a1 1 0 00.989-1.142L39.01 9H61z" />
      <Path
        d="M12.343 33h11.314v2H12.343z"
        transform="rotate(-45 17.995 34.006)"
      />
      <Path
        d="M26.343 33h11.314v2H26.343z"
        transform="rotate(-45 31.996 34.008)"
      />
      <Path
        d="M40.343 33h11.314v2H40.343z"
        transform="rotate(-45 45.997 34.011)"
      />
      <Path d="M33 7a1.001 1.001 0 01-2 0V5h-2v2c0 1.654 1.346 3 3 3s3-1.346 3-3V5h-2z" />
    </Svg>
  )
}

export default ShoppingCenterIcon
