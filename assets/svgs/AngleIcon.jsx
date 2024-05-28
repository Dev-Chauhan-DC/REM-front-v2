import * as React from "react"
import Svg, { Path } from "react-native-svg"

function AngleIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            {...props}
        >
            <Path d="M19.362 13.541a18.054 18.054 0 00-2.966-4.523l.707-.707a19.02 19.02 0 013.193 4.865l-.933.364zm-3.674-6.643a19.02 19.02 0 00-4.865-3.193l-.364.933a18.058 18.058 0 014.523 2.967l.707-.707zM21 21h1c0-2.084-.35-4.084-.972-5.962l-.931.363c.579 1.764.903 3.643.903 5.598zM8.962 2.972A18.888 18.888 0 003 2v1c1.956 0 3.834.324 5.599.903l.363-.931zM2.5 23c-.827 0-1.5-.673-1.5-1.5V0H0v21.5C0 22.879 1.122 24 2.5 24H24v-1H2.5z" />
        </Svg>
    )
}

export default AngleIcon
