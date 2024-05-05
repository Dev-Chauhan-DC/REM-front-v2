import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function PlusIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 15 15"
            {...props}
        >
            <G clipPath="url(#clip0_104_793)">
                <Path
                    d="M14.414 6.914H8.086V.586a.586.586 0 10-1.172 0v6.328H.586a.586.586 0 100 1.172h6.328v6.328a.586.586 0 001.172 0V8.086h6.328a.586.586 0 000-1.172z"

                />
            </G>
            <Defs>
                <ClipPath id="clip0_104_793">
                    <Path d="M0 0H15V15H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default PlusIcon
