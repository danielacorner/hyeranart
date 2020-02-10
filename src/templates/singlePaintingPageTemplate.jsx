import React from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import { useImagesQuery } from "../utils/queries"
import { SaatchiButton } from "../components/ButtonsDrawer"
import { useMediaQuery } from "@material-ui/core"
import { BREAKPOINTS } from "../utils/constants"
import Img from "gatsby-image"
// import PaintingMetadata from "../components/Masonry/PaintingMetadata"

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
  }
`
export default function Template({ pageContext }) {
  const { imageName, collectionTitle, moreInfo, saatchiLink } = pageContext
  const { imagesDataArr } = useImagesQuery()
  const imageOnThisPage = imagesDataArr.find(
    imageData => imageData.title === imageName
  )
  const isMobileOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILE}px)`)

  const metadata = {
    widthInches: imageOnThisPage.width,
    heightInches: imageOnThisPage.height,
    depthInches: imageOnThisPage.depth,
    title: imageOnThisPage.title,
    fullScreenLink: imageOnThisPage.Image,
    saatchiLink: imageOnThisPage.saatchiLink,
    type: "Painting",
  }

  return !imageOnThisPage ? null : (
    <Layout>
      <SinglePaintingPageStyles>
        <div
          style={{
            display: "flex",
            flexDirection: isMobileOrLarger ? "row" : "column",
            alignItems: "baseline",
          }}
        >
          {saatchiLink ? (
            <SaatchiButton
              saatchiLink={saatchiLink}
              style={{
                transform: "scale(0.8)",
                transformOrigin: `top ${isMobileOrLarger ? "right" : "left"}`,
                ...(isMobileOrLarger ? {} : { marginBottom: "0.5em" }),
              }}
            />
          ) : null}
        </div>
        <div className="imageWrapper">
          <Img fluid={imageOnThisPage.fluid} />
        </div>
        {/* <div className="description">
          <PaintingMetadata metadata={metadata} isLarge={true} />
        </div> */}
      </SinglePaintingPageStyles>
    </Layout>
  )
}
