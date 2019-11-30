import React from "react"
import IconButton from "@material-ui/core/IconButton"

const SeeInARoomSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="40"
    viewBox="0 0 42 40"
  >
    <g fill="#333" fillRule="evenodd">
      <path d="M9.13 0h23.74v16.364H9.13V0zm1.827 1.818v12.727h20.086V1.818H10.957z"></path>
      <path d="M14.608 3.636h3.652v3.636h-3.652z"></path>
      <path d="M12.783 10.91h1.826V9.09h5.478V7.274h1.826V3.636h3.652v3.637h1.826V9.09h1.826v3.636H12.783zM3.652 25.455v-3.637h34.696v3.637H42v10.909h-3.652V40h-1.826v-3.636H5.478V40H3.652v-3.636H0v-10.91h3.652zm1.826 1.818v1.818h31.044v-1.818H5.478z"></path>
    </g>
  </svg>
)

export const SeeInARoomButton = () => {
  return (
    <IconButton>
      <SeeInARoomSvg />
    </IconButton>
  )
}
