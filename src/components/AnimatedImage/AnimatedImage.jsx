import React from "react"
import { AnimatedImageContent } from "./AnimatedImageContent"
import styled from "styled-components"
import { Link } from "gatsby"

export const SCALE_ON_HOVER = 1.04

const AnimatedImageStyles = styled.div``

const AnimatedImage = ({
  title,
  fluid,
  widthInches,
  heightInches,
  depthInches,
  gridSize,
  fullScreenLink,
  saatchiLink,
  isSelected,
  isAnimationDisabled = false,
}) => {
  // grid-column: span ${width}
  // grid-row: span ${height}
  // https://youtu.be/OkCnhz__aFM?t=365
  const width = widthInches * gridSize
  const height = heightInches * gridSize
  const depthPx = depthInches * gridSize

  const metadata = {
    widthInches,
    heightInches,
    depthInches,
    title,
    fullScreenLink,
    saatchiLink,
    type: "Painting",
  }

  const paintingFile = fullScreenLink.split("/")[3] // e.g. 21st-correlation.jpg
  const paintingUrl = paintingFile.split(".")[0] // e.g. 21st-correlation
  return (
    <AnimatedImageStyles>
      <Link to={`paintings/${paintingUrl}`}>
        <AnimatedImageContent
          width={width}
          height={height}
          depthPx={depthPx}
          title={title}
          fluid={fluid}
          metadata={metadata}
        />
      </Link>
    </AnimatedImageStyles>
  )
}

export default AnimatedImage
