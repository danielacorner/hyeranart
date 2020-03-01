import React from "react"
import styled from "styled-components/macro"
import { useStaticQuery, graphql } from "gatsby"
import GatsbyImage from "gatsby-image"

const AboutStyles = styled.div`
  width: fit-content;
  margin: 2em 5em 0 auto;
`
export default () => {
  const data = useStaticQuery(graphql`
    query AboutPage {
      markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
        rawMarkdownBody
        frontmatter {
          title
          Image
          gatsbyImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  `)
  console.log("🌟🚨: data", data)
  const { frontmatter, rawMarkdownBody } = data.markdownRemark
  const { gatsbyImage } = frontmatter
  return (
    <AboutStyles>
      {gatsbyImage && <GatsbyImage fluid={gatsbyImage.childImageSharp.fluid} />}
      <h1>{frontmatter.title}</h1>
      <p>{rawMarkdownBody}</p>
    </AboutStyles>
  )
}
