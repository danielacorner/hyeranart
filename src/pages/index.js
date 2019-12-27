import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import MasonryGrid from "../components/Masonry/MasonryGrid"
import SideNav from "../components/Nav/SideNav"
import { useMediaQuery } from "@material-ui/core"
import { BREAKPOINTS } from "../utils/constants"
import TopNav from "../components/Nav/TopNav"
import { useImagesQuery } from "../components/queries"
import { useState } from "react"
import styled from "styled-components/macro"
import Pagination from "../components/Pagination"
import SwipeableViews from "react-swipeable-views"

if (process.env.NODE_ENV !== "production") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render")
  whyDidYouRender(React)
}
// inspiration:
// https://abstractartcollective.com
// enter animations http://abstractartcollective.com/penny-arnst/

// http://bomomo.com/

// 3d tilt https://codepen.io/dimaZubkov/pen/XqoGeW

// https://www.npmjs.com/package/react-tilt

// TODO: page flips of "magazine spreads"
// TODO: link paintings to saatchiart

const HomePageStyles = styled.div`
  .react-swipeable-view-container {
    [data-swipeable="true"] {
      overflow: hidden !important;
    }
  }
  .masonry-grid {
    margin: 0 1em;
  }
`

export default () => {
  const isTabletOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.TABTOP}px)`)
  const { imagesDataArr } = useImagesQuery()
  const [currentPageIdx, setCurrentPageIdx] = useState(0)
  const NUM_PER_PAGE = 6

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
  const slidesArr = [...Array(numPages)]

  const handleChangeIndex = index => setCurrentPageIdx(index)
  return (
    <Layout>
      <HomePageStyles>
        <SEO title="Home" />
        <div style={{ display: "flex" }}>
          {isTabletOrLarger ? <SideNav /> : <TopNav />}
          <SwipeableViews
            className="swipeable"
            index={currentPageIdx}
            onChangeIndex={handleChangeIndex}
            enableMouseEvents={true}
          >
            {slidesArr.map((_, idx) => (
              <div key={idx} className={`swipeable-slide slide-${idx}`}>
                <MasonryGrid imagesDataArr={imageSpreads[idx]} />
              </div>
            ))}
          </SwipeableViews>
        </div>
        <Pagination
          currentPageIdx={currentPageIdx}
          handlePrev={handlePrev}
          firstItemNum={firstItemNum}
          lastItemNum={lastItemNum}
          numItems={numItems}
          numPages={numPages}
          handleNext={handleNext}
        />
      </HomePageStyles>
    </Layout>
  )
}
