import React, { useEffect, useState } from "react"
import Layout, { SPRING_UP_DOWN_PX } from "../components/Layout"
import styled from "styled-components/macro"
import { useMediaQuery } from "@material-ui/core"
import { BREAKPOINTS } from "../utils/constants"
import { useTransition, animated } from "react-spring"

const SectionStyles = styled.div`
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
  img {
    width: 100%;
    height: auto;
  }
    max-width: 960px;
    margin-bottom: 6em;
`

export default function Template({ pageContext }) {
  const { title, moreInfo, pageIndex } = pageContext
  const isMobileOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILE}px)`)

  // if navigating from a section to a collection, we're moving down
  const prevIdx = window.localStorage.getItem("prevPrevIdx")

  const isMovingDown = prevIdx <= pageIndex

  const [isMounted, setIsMounted] = useState(true)

  useEffect(() => {
    return () => {
      setIsMounted(false)
    }
  }, [])

  const transitions = useTransition(isMounted, null, {
    from: {
      transform: `translateY(${
        isMovingDown ? SPRING_UP_DOWN_PX : -SPRING_UP_DOWN_PX
      }px)`,
      opacity: 0,
    },
    enter: {
      transform: `translateY(0px)`,
      opacity: 1,
    },
    leave: {
      transform: `translateY(${
        isMovingDown ? -SPRING_UP_DOWN_PX : SPRING_UP_DOWN_PX
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
              <SectionStyles>
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
                  </div>
                  <div
                    className="sectionInfo"
                    dangerouslySetInnerHTML={{ __html: moreInfo }}
                  />
              </SectionStyles>
            </animated.div>
          )
      )}
    </Layout>
  )
}
