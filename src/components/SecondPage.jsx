import React from "react"
import styled from "styled-components/macro"
import Img from "gatsby-image"
import { useImagesQuery } from "../utils/queries"
import { BREAKPOINTS } from "../utils/constants"
import { useStaticQuery, graphql } from "gatsby"
import { HOVER_UNDERLINE_CSS, CUBIC_BEZIER } from "./SplashPageCover"

const SecondPageStyles = styled.div`
  width: 90vw;
  max-width: 960px;

  margin-top: 2em;
  margin-left: auto;
  margin-right: 2em;
  font-family: "AvenirRegular";
  * {
    font-family: inherit;
  }
  li {
    list-style-type: none;
    ${HOVER_UNDERLINE_CSS}
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
    margin-left: auto;
    width: calc(100% - 3em);
  }
  .contentWrapper {
    width: 80%;
    margin-right: auto;
    line-height: 2em;
    margin-left: 1em;
    p {
      width: 100%;
    }
  }
  h1 {
    margin: 1.75em 0 0.6em 1.2em;
    font-style: italic;
    font-size: 1.6em;
  }
  h6 {
    font-size: 0.6em;
    margin-bottom: 1em;
  }
  ul {
    margin: 0;
    line-height: 1em;
  }
  @media (min-width: 960px) {
    width: 70vw;
    margin-top: 3em;
    margin-right: 2em;
    h1 {
      margin: 1.5em 0 0.6em 1.2em;
      font-size: 2em;
    }
    .imageWrapper {
      width: calc(100% - 4em);
    }
    .contentWrapper {
      margin-left: 1.5em;
    }
  }
  @media (min-width: ${BREAKPOINTS.DESKTOP}px) {
    margin-left: 30vw;
    margin-right: auto;
  }
`
export default () => {
  const data = useStaticQuery(graphql`
    query SecondPageTemplate {
      markdownRemark(frontmatter: { templateKey: { eq: "second-page" } }) {
        rawMarkdownBody
        frontmatter {
          title
          contactLinks {
            link
            title
          }
        }
      }
    }
  `)
  const { frontmatter, rawMarkdownBody } = data.markdownRemark
  const { contactLinks } = frontmatter
  const { imagesDataArr } = useImagesQuery()
  const secondPageImage = imagesDataArr.find(
    image => image.title === frontmatter.title
  ) || { fluid: null }
  return (
    <SecondPageStyles>
      <div className="imageWrapper">
        <Img fluid={secondPageImage.fluid} />
      </div>
      <div className="contentWrapper">
        <h1>ENERGY & FREEDOM</h1>
        <p>{rawMarkdownBody}</p>
        <h6>CONTACT</h6>
        <ul>
          {contactLinks.map(({ link, title }) => (
            <li key={title}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </SecondPageStyles>
  )
}
