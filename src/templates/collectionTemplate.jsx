import React from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import MasonryGrid from "../components/Masonry/MasonryGrid"
import { useImagesQuery } from "../utils/queries"
import { SaatchiButton } from "../components/ButtonsDrawer"
import { useMediaQuery } from "@material-ui/core"
import { BREAKPOINTS } from "../utils/constants"
import { useSpringTransitionLink } from "../pages"
import { animated } from "react-spring"

const CollectionStyles = styled.div`
  padding-top: 70px;
  padding-left: 70px;
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
    margin-left: -38px;
    margin-top: 38px;
  }
`
export default function Template({ pageContext, transitionStatus }) {
  const { images, title, moreInfo, saatchiLink } = pageContext
  const { imagesDataArr } = useImagesQuery()
  const imageTitlesArr = images.map(img => img.Image)
  const imagesDataArrForCollection = imagesDataArr.filter(image =>
    imageTitlesArr.includes(image.title)
  )
  const isMobileOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILE}px)`)

  const springTransitionLink = useSpringTransitionLink(transitionStatus)

  return (
    <Layout>
      <animated.div style={springTransitionLink}>
        <CollectionStyles>
          <div className="description">
            <div
              style={{
                display: "flex",
                flexDirection: isMobileOrLarger ? "row" : "column",
                alignItems: "baseline",
              }}
            >
              <h1
                style={{
                  flexGrow: 1,
                  ...(isMobileOrLarger ? {} : { marginBottom: "0.5em" }),
                }}
              >
                {title}
              </h1>
              {saatchiLink ? (
                <SaatchiButton
                  saatchiLink={saatchiLink}
                  style={{
                    transform: "scale(0.8)",
                    transformOrigin: `top ${
                      isMobileOrLarger ? "right" : "left"
                    }`,
                    ...(isMobileOrLarger ? {} : { marginBottom: "0.5em" }),
                  }}
                />
              ) : null}
            </div>
            <div
              className="collectionInfo"
              dangerouslySetInnerHTML={{ __html: moreInfo }}
            />
          </div>
          <div className="masonryWrapper">
            <MasonryGrid imagesDataArr={imagesDataArrForCollection} />
          </div>
        </CollectionStyles>
      </animated.div>
    </Layout>
  )
}
