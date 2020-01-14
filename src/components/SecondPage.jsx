import React from "react"
import styled from "styled-components/macro"
import Img from "gatsby-image"
import { useImagesQuery } from "../utils/queries"
import { useStaticQuery, graphql } from "gatsby"
import { HOVER_UNDERLINE_CSS, CUBIC_BEZIER } from "./SplashPageCover"

const SecondPageStyles = styled.div`
  width: 70vw;
  margin-left: auto;
  margin-top: 3em;
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
    width: calc(100% - 4em);
  }
  main {
    width: 100%;
    line-height: 2em;
  }
  h1 {
    margin-left: 2em;
    margin-top: 1.5em;
    font-style: italic;
    font-size: 2em;
  }
  h6 {
    font-size: 0.6em;
    margin-bottom: 1em;
  }
  ul {
    margin: 0;
  }
`
export default () => {
  const data = useStaticQuery(graphql`
    query SecondPageTemplate {
      markdownRemark(frontmatter: { templateKey: { eq: "second-page" } }) {
        rawMarkdownBody
        frontmatter {
          title
          body
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
      <h1>ENERGY & FREEDOM</h1>
      <main>
        <p>{rawMarkdownBody}</p>
      </main>
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
    </SecondPageStyles>
  )
}
