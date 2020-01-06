import React, { useContext } from "react"
import Layout, { SPRING_UP_DOWN_PX } from "../components/Layout"
import styled from "styled-components/macro"
import MasonryGrid from "../components/Masonry/MasonryGrid"
import { useImagesQuery } from "../utils/queries"
import { SaatchiButton } from "../components/ButtonsDrawer"
import { useMediaQuery } from "@material-ui/core"
import { BREAKPOINTS } from "../utils/constants"
import { useTransition, animated } from "react-spring"
import { GlobalStateContext } from "../context/GlobalContextProvider"

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
    margin-left: -36px;
  }
`

export default function Template({ pageContext }) {
  const { images, title, moreInfo, saatchiLink, date } = pageContext
  const { imagesDataArr } = useImagesQuery()
  const imageTitlesArr = images.map(img => img.Image)
  const imagesDataArrForCollection = imagesDataArr.filter(image =>
    imageTitlesArr.includes(image.title)
  )
  const isMobileOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILE}px)`)

  // track if we're moving up or down in collections
  const {isMovingDown} = useContext(GlobalStateContext)

  const transitions = useTransition(true, null, {
    from: {
      transform: `translateY(${
        isMovingDown ? -SPRING_UP_DOWN_PX : SPRING_UP_DOWN_PX
      }px)`,
      opacity: 0,
    },
    enter: {
      transform: `translateY(0px)`,
      opacity: 1,
    },
    leave: {
      transform: `translateY(${
        isMovingDown ? SPRING_UP_DOWN_PX : -SPRING_UP_DOWN_PX
      }px)`,
      opacity: 0,
    },
  })

  return (
    <Layout>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
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
          )
      )}
    </Layout>
  )
}
