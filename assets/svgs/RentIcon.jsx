import * as React from "react"
import Svg, { Path } from "react-native-svg"

function RentIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            {...props}
        >
            <Path d="M12 4c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2zm0-3a1 1 0 110 2 1 1 0 010-2zm8.239 10.007l-4.909-5.83a.505.505 0 00-.705-.061.502.502 0 00-.061.705l4.36 5.178H5.075l4.36-5.178a.5.5 0 00-.766-.644l-4.909 5.83A4.005 4.005 0 00-.001 15v5c0 2.206 1.794 4 4 4h16c2.206 0 4-1.794 4-4v-5a4.005 4.005 0 00-3.761-3.993zM23 20c0 1.654-1.346 3-3 3H4c-1.654 0-3-1.346-3-3v-5c0-1.654 1.346-3 3-3h16c1.654 0 3 1.346 3 3v5zM9 15v2h1.5a.5.5 0 010 1H9v2h1.5a.5.5 0 010 1H9a1 1 0 01-1-1v-5a1 1 0 011-1h1.5a.5.5 0 010 1H9zm-2 1.25C7 15.01 5.99 14 4.75 14H4a1 1 0 00-1 1v5.5a.5.5 0 001 0v-2h.75c.136 0 .268-.013.398-.036l.889 2.221a.5.5 0 00.464.314c.433 0 .566-.43.464-.686l-.897-2.242a2.247 2.247 0 00.933-1.822zM4 17.5V15h.75c.689 0 1.25.561 1.25 1.25s-.561 1.25-1.25 1.25H4zm17-3a.5.5 0 01-.5.5h-1v5.5a.5.5 0 01-1 0V15h-1a.5.5 0 010-1h3a.5.5 0 01.5.5zm-5 0v6a.499.499 0 01-.5.5.499.499 0 01-.447-.276L13 16.619v3.882a.5.5 0 01-1 0v-6c0-.231.159-.434.385-.486a.492.492 0 01.562.263L15 18.383v-3.882a.5.5 0 011 0z" />
        </Svg>
    )
}

export default RentIcon