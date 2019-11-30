import React from "react"
import styled from "styled-components/macro"
import { NAV_HEIGHT } from "../Carousel/CarouselStyles"
import { useImagesQuery } from "../queries"
import AnimatedImage from "./AnimatedImage"
import { BREAKPOINTS } from "../../utils/constants"
import { useMediaQuery } from "@material-ui/core"

const GRID_GAP = 16 * 3
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

const MasonryGridWrapper = () => {
  const { imagesDataArr } = useImagesQuery()
  const isTabletOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.TABLET}px)`)
  const isMobileOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILE}px)`)
  const gridMultiplier = isTabletOrLarger ? 1 : isMobileOrLarger ? 0.8 : 0.7

  const gridSize = GRID_SIZE * gridMultiplier
  const gridGap = GRID_GAP * gridMultiplier
  return (
    <MasonryGridMemoized
      imagesDataArr={imagesDataArr.filter(img => Boolean(img.fluid))}
      gridSize={gridSize}
      gridGap={gridGap}
      gridMultiplier={gridMultiplier}
    />
  )
}

const MasonryGrid = ({ imagesDataArr, gridSize, gridGap, gridMultiplier }) => {
  console.log("⚡🚨: imagesDataArr", imagesDataArr)

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
            },
            idx
          ) => (
            <div
              key={id}
              className="grid-item"
              style={{
                gridColumn: `span ${Math.ceil(width * gridMultiplier) +
                  gridGap / gridSize}`,
                gridRow: `span ${Math.ceil(height * gridMultiplier) +
                  gridGap / gridSize}`, // doesn't work?
                paddingTop: GRID_GAP,
              }}
            >
              <AnimatedImage
                gridSize={gridSize}
                title={title}
                fluid={fluid}
                depthInches={depth}
                widthInches={width * gridMultiplier}
                heightInches={height * gridMultiplier}
              />
            </div>
          )
        )}
      </div>
    </MasonryStyles>
  )
}

const areEqual = (prevProps, nextProps) =>
  prevProps.imagesDataArr.length === nextProps.imagesDataArr.length

const MasonryGridMemoized = React.memo(MasonryGrid, areEqual)

export default MasonryGridWrapper
