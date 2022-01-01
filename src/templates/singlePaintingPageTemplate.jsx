import React from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import { useImagesQuery } from "../utils/queries"
import { useMediaQuery } from "@material-ui/core"
import { BREAKPOINTS } from "../utils/constants"
import Img from "gatsby-image"
import { animated } from "react-spring"
import { useSpringTransitionLink } from "../pages"

const SinglePaintingPageStyles = styled.div`
  padding: 35px;
  @media (min-width: 768px) {
    padding: 35px 50px;
  }
  .description {
    margin-top: 1em;
    h1 {
      font-size: 24px;
      font-weight: normal;
      font-family: "Carme", sans-serif;
    }
  }
  .imageWrapper {
    position: relative;
    .isSold {
      position: absolute;
      top: 8px;
      right: 8px;
      background: #e13737;
      font-size: 16px;
      width: 52px;
      height: 52px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      border-radius: 999px;
    }
  }
  img {
    pointer-events: none;
  }
`
export default function Template({ pageContext, transitionStatus }) {
  const { imageName } = pageContext
  const { imagesDataArr, imagesDataArrMobile } = useImagesQuery()
  const isMobileOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILE}px)`)
  const imageOnThisPage = (isMobileOrLarger
    ? imagesDataArr
    : imagesDataArrMobile
  ).find(imageData => imageData.title === imageName)
  const springTransitionLink = useSpringTransitionLink(transitionStatus)

  // const metadata = {
  //   widthInches: imageOnThisPage.width,
  //   heightInches: imageOnThisPage.height,
  //   depthInches: imageOnThisPage.depth,
  //   title: imageOnThisPage.title,
  //   fullScreenLink: imageOnThisPage.Image,
  //   saatchiLink: imageOnThisPage.saatchiLink,
  //   type: "Painting",
  // }

  return !imageOnThisPage ? null : (
    <Layout>
      <animated.div style={springTransitionLink}>
        <SinglePaintingPageStyles>
          <div className="imageWrapper">
            <Img fluid={imageOnThisPage.fluid} />
            {imageOnThisPage.isSold && <div className="isSold">SOLD</div>}
          </div>
        </SinglePaintingPageStyles>
      </animated.div>
    </Layout>
  )
}
