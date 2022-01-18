import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import { animated } from "react-spring"
import { useSpringTransitionLink } from "../utils/customHooks"
import styled from "styled-components/macro"
import { CUBIC_BEZIER } from "../components/SplashPageCover"
import { BREAKPOINTS } from "../utils/constants"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const News = ({ transitionStatus }) => {
  const springTransitionLink = useSpringTransitionLink(transitionStatus)

  return (
    <Layout>
      <SEO title="News" />
      <animated.div style={springTransitionLink}>
        <NewsPageContent />
      </animated.div>
    </Layout>
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
  console.log(
    "🌟🚨 ~ file: news.js ~ line 53 ~ NewsPageContent ~ newsItems",
    newsItems
  )
  return (
    <SecondPageStyles>
      <h1>NEWS</h1>

      {newsItems.length <= 0 ? (
        <>Coming soon</>
      ) : (
        newsItems.map(({ title, image, content }) => {
          return (
            <>
              <div className="imageWrapper">
                <GatsbyImage image={image} alt={title} />
              </div>
              <div className="contentWrapper">
                <h2>{title}</h2>
                <div className="contentBody">{content}</div>
              </div>
            </>
          )
        })
      )}
    </SecondPageStyles>
  )
}

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
  .imageWrapper {
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
    margin: 1.5em 0 0.6em;
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
      margin: 1.75em 0 0.6em;
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
      margin: 1.5em 0 0.6em;
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
