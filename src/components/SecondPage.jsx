import React from "react"
import styled from "styled-components/macro"
import { GatsbyImage } from "gatsby-plugin-image"
import { BREAKPOINTS } from "../utils/constants"
import { useStaticQuery, graphql } from "gatsby"
import { HOVER_UNDERLINE_CSS, CUBIC_BEZIER } from "./SplashPageCover"
import { StaticImage } from "gatsby-plugin-image"

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

  return (
    <SecondPageStyles>
      <div className="imageWrapper">
        <StaticImage
          src={"../../static/images/uploads/second-page (1).jpg"}
          layout="fullWidth"
          placeholder="tracedSVG"
          alt={frontmatter.title}
        />
      </div>
      <div className="contentWrapper">
        <h1>ENERGY & FREEDOM</h1>
        <p>{rawMarkdownBody}</p>
        <h6>CONTACT</h6>
        <ul className="contactLinks">
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
    margin-bottom: 1.5em;
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
    .contentWrapper {
    }
  }
  @media (min-width: ${BREAKPOINTS.DESKTOP}px) {
    margin-left: 30vw;
    margin-right: auto;
  }
  .gatsby-image-wrapper {
    margin-top: 41px;
  }
  ul.contactLinks {
    li {
      a {
        padding: 0.5em;
        margin: -0.5em;
      }
      margin-bottom: 1em;
    }
  }
`
