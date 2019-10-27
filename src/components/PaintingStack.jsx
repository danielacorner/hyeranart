import React, { useState } from "react"
import styled from "styled-components/macro"

const IMG_HEIGHT_PX = 200

const StackContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  .img-container {
    max-height: ${IMG_HEIGHT_PX * 0.8}px;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    &:not(.expanded) {
      max-height: 80px;
    }
  }
`

const StackedImage = ({ idx, expandSelf, isExpanded }) => (
  <div
    onClick={expandSelf}
    className={`img-container${isExpanded ? " expanded" : ""}`}
  >
    <img
      src={`https://picsum.photos/${500 + idx}/${IMG_HEIGHT_PX}`}
      alt=""
      className="stacked"
    />
  </div>
)

export default () => {
  const [expandedImgIndex, setExpandedImgIndex] = useState(null)
  return (
    <StackContainerStyles>
      {[...Array(10)].map((_, idx) => (
        <StackedImage
          idx={idx}
          expandSelf={() => setExpandedImgIndex(idx)}
          isExpanded={idx === expandedImgIndex}
        />
      ))}
    </StackContainerStyles>
  )
}
