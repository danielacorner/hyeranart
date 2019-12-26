import React from "react"
import styled from "styled-components/macro"
import { NAV_HEIGHT } from "../Carousel/CarouselStyles"
import AnimatedImage from "./AnimatedImage"
import { BREAKPOINTS } from "../../utils/constants"
import { useMediaQuery } from "@material-ui/core"

const GRID_GAP = 16 * 5
const GRID_SIZE = 16

const MasonryStyles = styled.div`
  width: 100%;
  min-height: calc(100vh - ${NAV_HEIGHT}px);
  .masonry-grid {
    display: grid;
    grid-auto-flow: dense;
    grid-template-columns: repeat(
      auto-fill,
      minmax(${props => props.gridSize}px, 1fr)
    );
    width: auto;
    place-items: center center;
    place-content: center center;
  }
  .gatsby-image-wrapper {
  }
  .grid-item {
  }
`

const MasonryGridWrapper = ({ imagesDataArr }) => {
  const isTabletOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.TABLET}px)`)
  const isMobileOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILE}px)`)
  const gridMultiplier = isTabletOrLarger ? 1 : isMobileOrLarger ? 0.8 : 0.7

  const gridSize = GRID_SIZE * gridMultiplier
  const gridGap = GRID_GAP * gridMultiplier
  const gridGapSpan = Math.round(gridGap / gridSize)

  return (
    <MasonryGridMemoized
      imagesDataArr={imagesDataArr.filter(img => Boolean(img.fluid))}
      gridSize={gridSize}
      gridGapSpan={gridGapSpan}
      gridGap={gridGap}
      gridMultiplier={gridMultiplier}
    />
  )
}

const MasonryGrid = ({
  imagesDataArr,
  gridSize,
  gridGapSpan,
  gridGap,
  gridMultiplier,
}) => {
  return (
    <MasonryStyles gridSize={gridSize}>
      <div className={"masonry-grid"}>
        {imagesDataArr.map(
          (
            {
              id,
              Image,
              caption,
              date,
              moreInfo,
              path,
              price,
              title,
              width,
              height,
              depth,
              fluid,
              // viewInARoomLink, // TODO: link to saatchiart page
            },
            idx
          ) => {
            const widthInches = width * gridMultiplier
            const heightInches = height * gridMultiplier
            const xSpan = Math.ceil(widthInches + gridGapSpan)
            const ySpan = Math.ceil(heightInches + gridGapSpan)
            return (
              <div
                key={id}
                className="grid-item"
                style={{
                  gridColumn: `span ${xSpan}`,
                  gridRow: `span ${ySpan}`, // doesn't work?
                  marginTop: GRID_GAP,
                }}
              >
                <AnimatedImage
                  gridSize={gridSize}
                  gridGap={gridGap}
                  title={title}
                  fluid={fluid}
                  depthInches={depth}
                  widthInches={width * gridMultiplier}
                  heightInches={height * gridMultiplier}
                  fullScreenLink={Image}
                  inARoomLink={null}
                />
              </div>
            )
          }
        )}
      </div>
    </MasonryStyles>
  )
}

const MasonryGridMemoized = React.memo(MasonryGrid)

export default MasonryGridWrapper
