import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import MasonryGrid from "../components/Masonry/MasonryGrid"
import { useStaticQuery, graphql } from "gatsby"
import SideNav from "../components/Nav/SideNav"
import { useMediaQuery, IconButton } from "@material-ui/core"
import BackIcon from "@material-ui/icons/ArrowBackIos"
import ForwardIcon from "@material-ui/icons/ArrowForwardIos"
import { BREAKPOINTS } from "../utils/constants"
import TopNav from "../components/Nav/TopNav"
import { useImagesQuery } from "../components/queries"
import { useState } from "react"
import styled from "styled-components/macro"
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
  .paginationWrapper {
    width: fit-content;
    margin: 3em auto;
    display: flex;
    align-items: center;
  }
`

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
  const allDirectoriesArr = allDirectoriesData.allDirectory.edges

  const isTabletOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.TABTOP}px)`)
  const { imagesDataArr } = useImagesQuery()
  console.log("🌟🚨: imagesDataArr", imagesDataArr)
  const [currentPageIdx, setCurrentPageIdx] = useState(0)
  const NUM_PER_PAGE = 6
  const NUM_PAGES = 6 //TODO
  const imageSpreads = [
    imagesDataArr.slice(0, NUM_PER_PAGE),
    imagesDataArr.slice(NUM_PER_PAGE, NUM_PER_PAGE * 2),
    imagesDataArr.slice(NUM_PER_PAGE * 2, NUM_PER_PAGE * 3),
  ]
  const handleNext = () => setCurrentPageIdx(currentPageIdx + 1)
  const handlePrev = () => setCurrentPageIdx(currentPageIdx - 1)

  const firstItemNum = currentPageIdx * NUM_PER_PAGE + 1
  const lastItemNum = firstItemNum + NUM_PER_PAGE
  const numItems = imagesDataArr.length
  return (
    <Layout>
      <HomePageStyles>
        <SEO title="Home" />
        <div style={{ display: "flex" }}>
          {isTabletOrLarger ? <SideNav /> : <TopNav />}
          <MasonryGrid imagesDataArr={imageSpreads[currentPageIdx]} />
        </div>
        <div className="paginationWrapper">
          <IconButton disabled={currentPageIdx <= 0} onClick={handleNext}>
            <BackIcon />
          </IconButton>
          <div className="currentPageInfo">
            {firstItemNum} - {lastItemNum} of {numItems}
          </div>
          <IconButton
            disabled={currentPageIdx >= NUM_PAGES - 1}
            onClick={handlePrev}
          >
            <ForwardIcon />
          </IconButton>
        </div>
      </HomePageStyles>
    </Layout>
  )
}
