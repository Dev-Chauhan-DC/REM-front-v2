import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HousePersonIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            {...props}
        >
            <Path d="M22.968 7.866L13.658.572a2.68 2.68 0 00-3.316 0L1.033 7.866A2.674 2.674 0 000 9.986V24h24V9.986c0-.835-.377-1.607-1.032-2.12zM17 23H7v-3.5c0-.827.673-1.5 1.5-1.5h7c.827 0 1.5.673 1.5 1.5V23zm6 0h-5v-3.5c0-1.379-1.121-2.5-2.5-2.5h-7A2.502 2.502 0 006 19.5V23H1V9.986a1.7 1.7 0 01.649-1.333l9.31-7.294a1.685 1.685 0 012.082 0l9.311 7.294c.406.317.648.815.648 1.333V23zM12 7c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 7c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z" />
        </Svg>
    )
}

export default HousePersonIcon
