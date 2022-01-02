import React from "react"
import styled from "styled-components"
import AnimatedImage from "../AnimatedImage/AnimatedImage"
import { BREAKPOINTS } from "../../utils/constants"
import { useMediaQuery } from "@material-ui/core"

const GRID_SIZE = 16
const GRID_GAP = 16 * 5

const MasonryStyles = styled.div`
  width: 100%;
  padding-bottom: 2em;
  min-height: calc(100vh - 90px);
  .masonry-grid {
    width: fit-content;
    margin: auto;
    @media (min-width: ${BREAKPOINTS.MOBILELG}px) {
      width: 100%;
      display: grid;
      grid-auto-flow: dense;
      grid-template-columns: repeat(
        auto-fill,
        minmax(${(props) => props.gridSize}px, 1fr)
      );
      justify-items: baseline;
      place-content: center center;
    }
  }
  .gatsby-image-wrapper {
  }
  .grid-item {
  }
`

const MasonryGridWrapper = ({ imagesDataArr }) => {
  const isTabletOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.TABLET}px)`)
  const isMobileOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILE}px)`)
  const gridMultiplier = isTabletOrLarger ? 1 : isMobileOrLarger ? 0.8 : 0.6

  const gridSize = GRID_SIZE * gridMultiplier
  const gridGap = GRID_GAP * gridMultiplier
  const gridGapSpan = Math.round(gridGap / gridSize)

  return (
    <MasonryGridMemoized
      imagesDataArr={imagesDataArr.filter((img) => Boolean(img.fluid))}
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
  const isGridLayout = useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILELG}px)`)
  return (
    <MasonryStyles gridSize={gridSize}>
      <div className={"masonry-grid"}>
        {imagesDataArr.map(
          ({
            id,
            Image,
            isSold,
            title,
            width,
            height,
            depth,
            fluid,
            saatchiLink,
          }) => {
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
                  marginBottom: gridGap * (isGridLayout ? 1 : 2),
                }}
              >
                <AnimatedImage
                  gridSize={gridSize}
                  gridGap={gridGap}
                  title={title}
                  fluid={fluid}
                  depthInches={depth}
                  widthInches={widthInches}
                  heightInches={heightInches}
                  isSold={isSold}
                  originalDimensions={{
                    widthInches: width,
                    heightInches: height,
                  }}
                  fullScreenLink={Image}
                  saatchiLink={saatchiLink}
                  isAnimationDisabled={true}
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
