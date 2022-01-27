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
  .title,
  .details {
    font-size: ${(props) => (props.isLarge ? 2 : 1) * 0.5}em;
  }
  @media (min-width: ${BREAKPOINTS.MOBILE}px) {
    margin-top: 0.5em;
    .title,
    .details {
      font-size: ${(props) => (props.isLarge ? 2 : 1) * 0.6}em;
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
  const { heightInches, widthInches, depthInches, title, type } = metadata
  const heightTrimmed = Number((heightInches || 0).toFixed(2))
  const widthTrimmed = Number((widthInches || 0).toFixed(2))
  const depthTrimmed = Number((depthInches || 0).toFixed(2))

  const heightText = heightTrimmed ? `${heightTrimmed} H x"` : ""
  const widthText = widthTrimmed ? `${widthTrimmed} W"` : ""
  const depthText = depthTrimmed ? ` x ${depthTrimmed} D"` : ""
  return (
    <MetadataStyles isLarge={isLarge}>
      <div className="title">{title}</div>
      <div className="details">
        {type}, {heightText}
        {widthText}
        {depthText} in
      </div>
    </MetadataStyles>
  )
}
