import React from "react"
import styled from "styled-components/macro"

const MetadataStyles = styled.div`
  pointer-events: none;
  margin-top: 0.5em;
  height: auto;
  .title {
    height: 1em;
    margin-bottom: 0.25em;
  }
  .details {
    font-size: 0.8em;
    height: 1em;
  }
`
export default ({ metadata }) => {
  const { heightInches, widthInches, depthInches, title, type } = metadata
  const heightTrimmed = Number(heightInches.toFixed(2))
  const widthTrimmed = Number(widthInches.toFixed(2))
  return (
    <MetadataStyles>
      <div className="title">{title}</div>
      <div className="details">
        {type}, {heightTrimmed} H x {widthTrimmed} W x {depthInches} in
      </div>
    </MetadataStyles>
  )
}
