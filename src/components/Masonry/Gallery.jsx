import React from "react"

import MasonryGrid from "./MasonryGrid"
import { useImagesQuery } from "../../utils/queries"
import { useState } from "react"
import styled from "styled-components/macro"
import Pagination from "../Pagination"
import SwipeableViews from "react-swipeable-views"

const GalleryStyles = styled.div`
  height: 100%;
  .react-swipeable-view-container {
    [data-swipeable="true"] {
      overflow: hidden !important;
    }
  }
  .masonry-grid {
    margin: 0 1em;
  }
`

// TODO: adjustable NUM_PER_PAGE?
const NUM_PER_PAGE = 6

export default () => {
  const { imagesDataArr } = useImagesQuery()
  // TODO: consider performance using react-swipeable-views-utils virtualization
  // https://react-swipeable-views.com/demos/demos/
  const [currentPageIdx, setCurrentPageIdx] = useState(0)

  const imageSpreads = imagesDataArr.reduce((acc, image, idx) => {
    const idxInSpreads = Math.floor(idx / NUM_PER_PAGE)
    if (acc[idxInSpreads]) {
      acc[idxInSpreads].push(image)
    } else {
      acc[idxInSpreads] = [image]
    }
    return acc
  }, [])
  const handleNext = () => setCurrentPageIdx(currentPageIdx + 1)
  const handlePrev = () => setCurrentPageIdx(currentPageIdx - 1)

  const firstItemNum = currentPageIdx * NUM_PER_PAGE + 1
  const lastItemNum = firstItemNum + NUM_PER_PAGE
  const numItems = imagesDataArr.length
  const numPages = Math.ceil(numItems / NUM_PER_PAGE)
  const allPagesNums = [...Array(numPages).keys()]

  const handleChangeIndex = index => setCurrentPageIdx(index)
  const handleFilterToNearestSlides = () => {
    // when we switch slides, "virtualize" so that only the nearest three slides are rendered
  }
  return (
    <GalleryStyles>
      <SwipeableViews
        className="swipeable"
        index={currentPageIdx}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents={true}
        onTransitionEnd={handleFilterToNearestSlides}
      >
        {allPagesNums.map(idx => (
          <div key={idx} className={`swipeable-slide slide-${idx}`}>
            <MasonryGrid imagesDataArr={imageSpreads[idx]} />
          </div>
        ))}
      </SwipeableViews>
      <Pagination
        setCurrentPageIdx={setCurrentPageIdx}
        currentPageIdx={currentPageIdx}
        handlePrev={handlePrev}
        firstItemNum={firstItemNum}
        lastItemNum={lastItemNum}
        numItems={numItems}
        numPages={numPages}
        handleNext={handleNext}
      />
    </GalleryStyles>
  )
}
