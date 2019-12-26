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
  return (
    <MetadataStyles>
      <div className="title">{title}</div>
      <div className="details">
        {type}, {heightInches} H x {widthInches} W x {depthInches} in
      </div>
    </MetadataStyles>
  )
}
