
import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LoanIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            {...props}
        >
            <Path d="M19.5 2H18V.5a.5.5 0 00-1 0V2H7V.5a.5.5 0 00-1 0V2H4.5A4.505 4.505 0 000 6.5v13C0 21.981 2.019 24 4.5 24h6a.5.5 0 000-1h-6C2.57 23 1 21.43 1 19.5V9h22v5.5a.5.5 0 001 0v-8C24 4.019 21.981 2 19.5 2zM23 8H1V6.5C1 4.57 2.57 3 4.5 3h15C21.43 3 23 4.57 23 6.5V8zm-3.314 7.171c.399-.359.843-.825 1.152-1.351a1.178 1.178 0 000-1.196 1.242 1.242 0 00-1.072-.623h-2.533c-.44 0-.852.239-1.072.623a1.184 1.184 0 000 1.197c.309.526.753.992 1.152 1.351-2.316.682-4.314 3.232-4.314 5.829a2.997 2.997 0 003 2.988h5c1.654 0 3-1.34 3-2.988 0-2.598-1.998-5.147-4.314-5.829zm-2.66-1.856a.187.187 0 01.004-.194.237.237 0 01.204-.121h2.533c.125 0 .188.092.204.121a.185.185 0 01.004.193c-.39.665-1.089 1.251-1.475 1.544-.386-.292-1.084-.877-1.475-1.544zm3.975 9.674h-5c-1.103 0-2-.892-2-1.988 0-2.439 2.309-4.915 4.5-5 2.191.085 4.5 2.561 4.5 5a1.996 1.996 0 01-2 1.988z" />
        </Svg>
    )
}

export default LoanIcon
