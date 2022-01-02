import React from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import MasonryGrid from "../components/Masonry/MasonryGrid"
import { useImagesQuery } from "../utils/queries"
import { useMediaQuery } from "@material-ui/core"
import { BREAKPOINTS } from "../utils/constants"
import { animated } from "react-spring"
import { useSpringTransitionLink } from "../utils/customHooks"

const CollectionStyles = styled.div`
  padding: 15px 24px;
  position: relative;
  z-index: -1;
  @media (min-width: 960px) {
    padding: 15px 48px;
  }
  .description {
    padding-right: 70px;
    margin-bottom: -40px;
    h1 {
      font-size: 24px;
      font-weight: normal;
      font-family: "Carme", sans-serif;
    }
  }
  .masonryWrapper {
    padding-bottom: 140px;
    margin-top: ${(props) => (props.isGridLayout ? 38 : 64)}px;
  }
`

export default function Template({ pageContext, transitionStatus }) {
  const { images /* , title, moreInfo, saatchiLink */ } = pageContext
  const { imagesDataArr, imagesDataArrMobile } = useImagesQuery()
  const imageTitlesArr = images.map((img) => img.Image)
  const isMobileOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILE}px)`)

  const imagesDataArrForCollection = (
    isMobileOrLarger ? imagesDataArr : imagesDataArrMobile
  ).filter((image) => imageTitlesArr.includes(image.title))

  const springTransitionLink = useSpringTransitionLink(transitionStatus)
  const isGridLayout = useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILELG}px)`)

  return (
    <Layout>
      <CollectionStyles isGridLayout={isGridLayout}>
        <animated.div style={springTransitionLink}>
          {/* <DescriptionAndInfo
            title={title}
            moreInfo={moreInfo}
            saatchiLink={saatchiLink}
            isMobileOrLarger={isMobileOrLarger}
          /> */}
          <div className="masonryWrapper">
            <MasonryGrid imagesDataArr={imagesDataArrForCollection} />
          </div>
        </animated.div>
      </CollectionStyles>
    </Layout>
  )
}
