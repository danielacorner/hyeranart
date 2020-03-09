import React from "react"
import { AnimatedImageContent } from "./AnimatedImageContent"
import styled from "styled-components"
import { Link } from "gatsby"
import { kebabCase } from "lodash"

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

  const paintingUrl = getPaintingUrlFromFilePath(fullScreenLink)
  return (
    <AnimatedImageStyles>
      <Link to={`/paintings/${kebabCase(paintingUrl)}`}>
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

export function getPaintingUrlFromFilePath(filePath) {
  if (!filePath) {
    return null
  }
  const paintingFile = filePath.split("/").slice(-1)[0] // e.g. 21st-correlation.jpg
  if (!paintingFile) {
    return null
  }
  return paintingFile.split(".")[0] // e.g. 21st-correlation
}
