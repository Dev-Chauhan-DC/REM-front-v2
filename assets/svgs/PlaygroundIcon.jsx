import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PlaygroundIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19 16"
      {...props}
    >
      <Path
        d="M18.438 13.838h-1.052L12.208 2.874l.228-.8A1.564 1.564 0 0011.273.12L10.905.04a1.564 1.564 0 00-1.841 1.096L8.29 3.838h-.628l-.455-.964.228-.8A1.563 1.563 0 006.273.12L5.895.036A1.567 1.567 0 004.057 1.12L.012 15.316a.313.313 0 00.601.17l.467-1.648h4.354l-.422 1.477a.313.313 0 00.601.172l2.01-7.035 3.345 7.082a.313.313 0 00.282.18h7.188a.313.313 0 00.312-.313v-1.25a.313.313 0 00-.312-.313zM9.665 1.306A.938.938 0 0110.769.65l.368.082a.938.938 0 01.698 1.172l-.196.685H9.3l.366-1.282zm-5.008-.01a.94.94 0 011.102-.65l.378.085a.938.938 0 01.698 1.172l-.196.685H4.275l.382-1.292zM2.32 9.463l.354-1.25h4.366l-.357 1.25H2.321zm4.184.625l-.357 1.25H1.79l.355-1.25h4.361zm-3.652-2.5l.354-1.25h3.418l.59 1.25H2.853zm.531-1.875l.355-1.25h2l.59 1.25H3.385zm-2.126 7.5l.354-1.25H5.97l-.357 1.25H1.258zm11.867 1.875h-1.677L6.22 4.018a.313.313 0 00-.282-.18H3.916l.177-.625h2.584l5.228 11.071a.311.311 0 00.283.18h.937v.624zm.625 0v-.937a.313.313 0 00-.312-.313h-1.052L7.959 4.463h2.78l5.018 10.625H13.75zm4.375 0h-1.677L11.22 4.018a.313.313 0 00-.282-.18H8.94l.179-.625h2.557l5.228 11.071a.311.311 0 00.283.18h.937v.624z"
      />
    </Svg>
  )
}

export default PlaygroundIcon