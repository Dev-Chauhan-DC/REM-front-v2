import * as React from "react"
import Svg, { Path } from "react-native-svg"

function AvailabilityIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            {...props}
        >
            <Path d="M19.5 2H18V.5a.5.5 0 00-1 0V2H7V.5a.5.5 0 00-1 0V2H4.5A4.505 4.505 0 000 6.5v13C0 21.981 2.019 24 4.5 24h15c2.481 0 4.5-2.019 4.5-4.5v-13C24 4.019 21.981 2 19.5 2zm-15 1h15C21.43 3 23 4.57 23 6.5V8H1V6.5C1 4.57 2.57 3 4.5 3zm15 20h-15C2.57 23 1 21.43 1 19.5V9h22v10.5c0 1.93-1.57 3.5-3.5 3.5zm-.652-10.859a.5.5 0 01-.01.707l-6.596 6.424c-.484.484-1.122.727-1.762.727s-1.281-.244-1.77-.732l-3.562-3.401a.5.5 0 01.691-.723l3.569 3.409c.581.582 1.562.575 2.13.008l6.601-6.429a.5.5 0 01.707.01z" />
        </Svg>
    )
}

export default AvailabilityIcon
