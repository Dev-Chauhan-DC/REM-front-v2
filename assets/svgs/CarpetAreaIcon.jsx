import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function CarpetAreaIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21 20"
      {...props}
    >
      <G clipPath="url(#clip0_125_313)" fill="#5E626A">
        <Path d="M16.66 3.594H.406a.399.399 0 00-.406.39V19.61c0 .216.182.391.406.391h16.255a.399.399 0 00.406-.39V3.983a.399.399 0 00-.407-.39zm-.406 15.625H.813V4.375h15.441V19.22zM13.78.112c-.11-.15-.288-.15-.397 0a.482.482 0 000 .538l.222.302H3.732L3.955.65a.482.482 0 000-.538c-.11-.15-.287-.15-.397 0l-.702.952a.482.482 0 000 .539l.702.952a.249.249 0 00.198.112.249.249 0 00.199-.112.482.482 0 000-.539l-.223-.302h9.873l-.222.302a.483.483 0 000 .54.249.249 0 00.198.11.249.249 0 00.199-.11l.701-.953a.483.483 0 000-.539L13.78.112zM20.69 16.198a.536.536 0 00-.561 0l-.314.214v-9.49l.314.213a.504.504 0 00.28.08.504.504 0 00.28-.08c.155-.105.155-.276 0-.381l-.99-.675a.536.536 0 00-.561 0l-.99.675c-.155.105-.155.276 0 .381a.536.536 0 00.56 0l.314-.214v9.491l-.314-.214a.536.536 0 00-.56 0c-.155.105-.155.276 0 .382l.99.674a.504.504 0 00.28.08.504.504 0 00.28-.08l.991-.674c.155-.106.155-.277 0-.382z" />
        <Path d="M2.844 17.656h11.378a.399.399 0 00.407-.39V6.328a.399.399 0 00-.407-.39H2.844a.399.399 0 00-.406.39v10.938c0 .215.182.39.406.39zm1.264-9.56c.08.076.184.114.288.114a.414.414 0 00.287-.114.38.38 0 000-.553l-.858-.824h9.416l-4.708 4.526-1.264-1.216a.418.418 0 00-.575 0 .38.38 0 000 .553l1.265 1.215-4.708 4.526V7.27l.857.825zm9.708 8.227l-4.708-4.526 4.708-4.526v9.052zm-.575.552H3.825l4.708-4.526 4.708 4.526z" />
        <Path d="M5.69 9.453a.399.399 0 00.406-.39.399.399 0 00-.407-.391.399.399 0 00-.406.39c0 .216.182.391.406.391z" />
      </G>
      <Defs>
        <ClipPath id="clip0_125_313">
          <Path fill="#fff" d="M0 0H20.8054V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default CarpetAreaIcon