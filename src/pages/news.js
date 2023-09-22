import React, { lazy } from "react"


import { SEO } from "../components/seo"
import { animated } from "react-spring"
import { useSpringTransitionLink } from "../utils/customHooks"
import styled from "styled-components/macro"
import { CUBIC_BEZIER } from "../components/SplashPageCover"
import { BREAKPOINTS } from "../utils/constants"
import { graphql, useStaticQuery } from "gatsby"
import { IconButton } from "@mui/material"
import { KeyboardArrowUp } from "@mui/icons-material"

const NewsItemLoadable = lazy(() => import("../components/NewsItem"))

const News = ({ transitionStatus }) => {
  const springTransitionLink = useSpringTransitionLink(transitionStatus)

  return (
    <>
      <SEO title="News" />
      <animated.div style={springTransitionLink}>
        <NewsPageContent />
      </animated.div>
    </>
  )
}
export default News

function NewsPageContent() {
  const data = useStaticQuery(graphql`
    query NewsPageQuery {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              title
              Image
              content
              date
              images {
                Image
              }
            }
          }
        }
      }
    }
  `)

  const newsItems = data.allMarkdownRemark.edges.filter(
    (d) => d.node.frontmatter.content
  )
  const newsNodes = newsItems.map((n) => n.node.frontmatter)

  return (
    <SecondPageStyles>
      <h1>NEWS</h1>
      {newsNodes
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((node, idx) => {
          const last = idx === newsNodes.length - 1
          return (
            <React.Fragment key={node.title}>
              <NewsItemLoadable {...node} />
              {last ? (
                <div style={{ height: "12em" }}>
                  <BtnReturnToTop />
                </div>
              ) : (
                <hr />
              )}
            </React.Fragment>
          )
        })}
    </SecondPageStyles>
  )
}

function BtnReturnToTop() {
  return (
    <BtnReturnToTopStyles>
      <IconButton
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }}
      >
        <KeyboardArrowUp />
      </IconButton>
    </BtnReturnToTopStyles>
  )
}
const BtnReturnToTopStyles = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`

const SecondPageStyles = styled.div`
  width: 90vw;
  max-width: 960px;
  margin-top: 1em;
  margin-left: auto;
  margin-right: 1.5em;
  font-family: "AvenirRegular";
  * {
    font-family: inherit;
  }
  h2 {
    margin-bottom: 0;
  }
  hr {
    margin-top: 8em;
    margin-bottom: 4em;
  }
  .dateStamp {
    font-size: 0.8em;
    color: #999999;
  }
  .contentBody a {
    text-decoration: underline;
  }
  li {
    list-style-type: none;
    width: fit-content;
  }
  a {
    transition: color 0.3s ${CUBIC_BEZIER};
    text-decoration: none;
    color: black;
    &:hover {
      color: cornflowerblue;
    }
  }
  img {
    margin-bottom: 0;
  }
  .imageWrapper {
    margin-bottom: 1em;
  }
  .contentWrapper {
    width: 80%;
    margin-right: auto;
    line-height: 2em;
    p {
      width: 100%;
    }
  }
  h1 {
    margin: 1.5em 0 2.6em;
    font-style: italic;
    font-size: 1.6em;
    white-space: nowrap;
  }
  h6 {
    font-size: 0.6em;
    margin-bottom: 1em;
  }
  ul {
    margin: 0;
    line-height: 1em;
  }
  @media (min-width: 600px) {
    width: 80vw;
    margin-right: 3em;

    h1 {
      margin: 1.75em 0 2.6em;
    }
  }
  @media (min-width: 760px) {
    width: 70vw;
    margin-top: 2em;
  }
  @media (min-width: 960px) {
    margin-top: 3em;
    margin-right: 5em;
    h1 {
      margin: 1.5em 0 2.6em;
      font-size: 2em;
    }
    .imageWrapper {
    }
    .contentWrapper {
    }
  }
  @media (min-width: ${BREAKPOINTS.DESKTOP}px) {
    margin-left: 30vw;
    margin-right: auto;
  }
`

export { Head } from "./index"
