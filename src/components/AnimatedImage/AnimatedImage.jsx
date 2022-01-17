import React from "react"
import { AnimatedImageContent } from "./AnimatedImageContent"
import styled from "styled-components"
import { Link } from "gatsby"
import { kebabCase } from "lodash"

export const SCALE_ON_HOVER = 1.04

const AnimatedImageStyles = styled.div`
  position: relative;
  .isSold {
    position: absolute;
    bottom: 8px;
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
`

const AnimatedImage = ({
  title,
  image,
  widthInches,
  heightInches,
  depthInches,
  isSold,
  gridSize,
  fullScreenLink,
  saatchiLink,
  originalDimensions,
}) => {
  // grid-column: span ${width}
  // grid-row: span ${height}
  // https://youtu.be/OkCnhz__aFM?t=365
  const width = widthInches * gridSize
  const height = heightInches * gridSize
  const depthPx = depthInches * gridSize

  const metadata = {
    ...originalDimensions,
    depthInches,
    title,
    fullScreenLink,
    saatchiLink,
    type: "Painting",
  }

  return (
    <AnimatedImageStyles>
      <Link to={`/paintings/${kebabCase(title)}`}>
        <AnimatedImageContent
          width={width}
          height={height}
          depthPx={depthPx}
          title={title}
          image={image}
          metadata={metadata}
        />
        {isSold && <div className="isSold">SOLD</div>}
      </Link>
    </AnimatedImageStyles>
  )
}

export default AnimatedImage
