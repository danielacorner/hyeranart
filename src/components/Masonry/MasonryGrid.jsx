import React from "react"
import Masonry from "react-masonry-css"
import Img from "gatsby-image"
import styled from "styled-components/macro"
import { NAV_HEIGHT } from "../Carousel/CarouselStyles"

const GRID_GAP = 30

const MasonryStyles = styled.div`
  width: 100%;
  min-height: calc(100vh - ${NAV_HEIGHT}px);
  .masonry-grid {
    display: flex;
    margin-left: -${GRID_GAP}px; /* gutter size offset */
    width: auto;
  }
  .masonry-grid_column {
    padding-left: ${GRID_GAP}px; /* gutter size */
    background-clip: padding-box;
  }
  .gatsby-image-wrapper {
    margin-bottom: ${GRID_GAP}px;
  }
`

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
}

export default ({ imgFluidArray }) => {
  return (
    <MasonryStyles>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={"masonry-grid"}
        columnClassName={"masonry-grid_column"}
      >
        {imgFluidArray.map(fluid => (
          <Img key={fluid} fluid={fluid} />
        ))}
      </Masonry>
    </MasonryStyles>
  )
}
