import React from "react"
import styled from "styled-components/macro"
import { BREAKPOINTS } from "../../utils/constants"

const MetadataStyles = styled.div`
  pointer-events: none;
  margin-top: 0.5em;
  height: auto;
  .title {
    margin-bottom: 0.25em;
  }
  .details {
    color: hsla(0, 0%, 0%, 0.5);
  }
  .title,
  .details {
    line-height: normal;
    font-size: 0.5em;
  }
  @media (min-width: ${BREAKPOINTS.MOBILE}px) {
    .title,
    .details {
      font-size: 0.6em;
    }
  }
`
export default ({ metadata }) => {
  const { heightInches, widthInches, depthInches, title, type } = metadata
  const heightTrimmed = Number(heightInches.toFixed(2))
  const widthTrimmed = Number(widthInches.toFixed(2))
  const depthTrimmed = Number(depthInches.toFixed(2))
  return (
    <MetadataStyles>
      <div className="title">{title}</div>
      <div className="details">
        {type}, {heightTrimmed} H x {widthTrimmed} W x {depthTrimmed} in
      </div>
    </MetadataStyles>
  )
}
