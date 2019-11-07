import React, { useState } from "react"
import styled from "styled-components"

const IMG_HEIGHT_PX = 220
const IMG_HEIGHT_COLLAPSED_PX = 70
const CANVAS_OFFSET_PX = 4

const StackContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  .img-container {
    max-height: ${IMG_HEIGHT_PX}px;
    margin-top: 10px;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    position: relative;
    .canvas-background {
      transition: all 0.5s ease-in-out;
      transform: scale(0.98);
      box-shadow: 0px 4px 2px #0000007d;
      &:before,
      &:after {
        position: absolute;
        content: "";
        background: hsla(0, 0%, 90%);
      }
      &:before {
        top: ${CANVAS_OFFSET_PX / 2}px;
        bottom: -${CANVAS_OFFSET_PX / 2}px;
        left: 100%;
        width: ${CANVAS_OFFSET_PX}px;
        transform: skew(0deg, 45deg);
      }
      &:after {
        top: 100%;
        right: -${CANVAS_OFFSET_PX / 2}px;
        left: ${CANVAS_OFFSET_PX / 2}px;
        height: ${CANVAS_OFFSET_PX}px;
        transform: skew(45deg, 0deg);
      }
    }
    &.expanded {
      .canvas-background {
        transform: scale(1);
        box-shadow: 0px 4px 7px #0000007d;
      }
    }
    &:not(.expanded) {
      max-height: ${IMG_HEIGHT_COLLAPSED_PX}px;
      .canvas-background {
        transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
    }
  }
`

const StackedImage = ({ idx, expandSelf, isExpanded }) => (
  <div
    onClick={expandSelf}
    className={`img-container${isExpanded ? " expanded" : ""}`}
  >
    <div
      className="canvas-background"
      style={{
        backgroundImage: `url(https://picsum.photos/${500 +
          idx}/${IMG_HEIGHT_PX})`,
        height: IMG_HEIGHT_PX,
      }}
    ></div>
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
