import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import MasonryGrid from "../components/Masonry/MasonryGrid"
import { useStaticQuery, graphql } from "gatsby"
import SideNav from "../components/Nav/SideNav"
import { useMediaQuery } from "@material-ui/core"
import { BREAKPOINTS } from "../utils/constants"
import TopNav from "../components/Nav/TopNav"
import { useImagesQuery } from "../components/queries"
import { useState } from "react"
import styled from "styled-components/macro"
import Pagination from "../components/Pagination"

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

const HomePageStyles = styled.div``

export default () => {
  const allDirectoriesData = useStaticQuery(graphql`
    query RecipePageByID {
      allDirectory {
        edges {
          node {
            id
            relativePath
          }
        }
      }
    }
  `)

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
  const handleNext = () => {
    setCurrentPageIdx(currentPageIdx + 1)
    window.scrollTo({ top: 0, behavior: "auto" })
  }
  const handlePrev = () => {
    setCurrentPageIdx(currentPageIdx - 1)
    window.scrollTo({ top: 0, behavior: "auto" })
  }

  const firstItemNum = currentPageIdx * NUM_PER_PAGE + 1
  const lastItemNum = firstItemNum + NUM_PER_PAGE
  const numItems = imagesDataArr.length
  const numPages = Math.ceil(numItems / NUM_PER_PAGE)
  return (
    <Layout>
      <HomePageStyles>
        <SEO title="Home" />
        <div style={{ display: "flex" }}>
          {isTabletOrLarger ? <SideNav /> : <TopNav />}
          <MasonryGrid imagesDataArr={imageSpreads[currentPageIdx]} />
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
