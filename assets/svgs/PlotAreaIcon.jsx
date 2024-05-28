import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PlotAreaIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            {...props}
        >
            <Path d="M19.5 24h-15A4.505 4.505 0 010 19.5v-15C0 2.019 2.019 0 4.5 0h15C21.981 0 24 2.019 24 4.5v15c0 2.481-2.019 4.5-4.5 4.5zM4.5 1C2.57 1 1 2.57 1 4.5v15C1 21.43 2.57 23 4.5 23h15c1.93 0 3.5-1.57 3.5-3.5v-15C23 2.57 21.43 1 19.5 1h-15z" />
        </Svg>
    )
}

export default PlotAreaIcon
