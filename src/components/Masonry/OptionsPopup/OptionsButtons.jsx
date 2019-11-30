import React from "react"
import { Fab, Tooltip } from "@material-ui/core"
import ZoomIcon from "@material-ui/icons/ZoomIn"

const SeeInARoomSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 42 40">
    <g fill="#333" fillRule="evenodd">
      <path d="M9.13 0h23.74v16.364H9.13V0zm1.827 1.818v12.727h20.086V1.818H10.957z"></path>
      <path d="M14.608 3.636h3.652v3.636h-3.652z"></path>
      <path d="M12.783 10.91h1.826V9.09h5.478V7.274h1.826V3.636h3.652v3.637h1.826V9.09h1.826v3.636H12.783zM3.652 25.455v-3.637h34.696v3.637H42v10.909h-3.652V40h-1.826v-3.636H5.478V40H3.652v-3.636H0v-10.91h3.652zm1.826 1.818v1.818h31.044v-1.818H5.478z"></path>
    </g>
  </svg>
)

const CommentsIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="comments"
    role="img"
    height="22"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
  >
    <path
      fill="#333"
      d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"
    ></path>
  </svg>
)

export const SeeInARoomButton = ({ onClick }) => {
  return (
    <Tooltip title="See in a room">
      <Fab onClick={onClick} size="small" aria-label="See in a room">
        <SeeInARoomSvg />
      </Fab>
    </Tooltip>
  )
}
export const ZoomButton = ({ onClick }) => {
  return (
    <Tooltip title="View full-screen">
      <Fab onClick={onClick} size="small" aria-label="View full-screen">
        <ZoomIcon />
      </Fab>
    </Tooltip>
  )
}
export const CommentsButton = ({ onClick }) => {
  return (
    <Tooltip title="Make an offer">
      <Fab onClick={onClick} size="small" aria-label="Make an offer">
        <CommentsIcon />
      </Fab>
    </Tooltip>
  )
}
