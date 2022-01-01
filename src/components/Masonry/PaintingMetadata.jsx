import React from "react"
import styled from "styled-components"
import { BREAKPOINTS } from "../../utils/constants"

const MetadataStyles = styled.div`
  pointer-events: none;
  margin-top: 0.25em;
  height: auto !important;
  position: relative;
  .title {
    margin-bottom: 0.25em;
    line-height: normal;
    color: black;
  }
  .details {
    line-height: 1em;
    color: hsla(0, 0%, 0%, 0.5);
  }
  .isSold {
    position: absolute;
    top: 1px;
    right: 8px;
    background: #e13737;
    font-size: 8px;
    width: 26px;
    height: 26px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    border-radius: 999px;
  }
  .title,
  .details {
    font-size: ${props => (props.isLarge ? 2 : 1) * 0.5}em;
  }
  @media (min-width: ${BREAKPOINTS.MOBILE}px) {
    margin-top: 0.5em;
    .title,
    .details {
      font-size: ${props => (props.isLarge ? 2 : 1) * 0.6}em;
    }
  }
`

export default ({ metadata, isLarge }) => {
  if (!metadata) {
    return (
      <MetadataStyles isLarge={isLarge}>
        <div className="title"></div>
        <div className="details"></div>
      </MetadataStyles>
    )
  }
  const {
    heightInches,
    widthInches,
    depthInches,
    title,
    type,
    isSold,
  } = metadata
  const heightTrimmed = Number(heightInches.toFixed(2))
  const widthTrimmed = Number(widthInches.toFixed(2))
  const depthTrimmed = Number(depthInches.toFixed(2))
  return (
    <MetadataStyles isLarge={isLarge}>
      <div className="title">{title}</div>
      <div className="details">
        {type}, {heightTrimmed} H x {widthTrimmed} W x {depthTrimmed} in
      </div>
      {isSold && <div className="isSold">SOLD</div>}
    </MetadataStyles>
  )
}
