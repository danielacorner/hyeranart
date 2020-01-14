import React from "react"
import styled from "styled-components/macro"
import { useStaticQuery, graphql } from "gatsby"

const AboutStyles = styled.div`
  width: fit-content;
  margin: 2em 5em 0 auto;
`
export default () => {
  const data = useStaticQuery(graphql`
    query AboutPageTemplate {
      markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
        rawMarkdownBody
        frontmatter {
          title
        }
      }
    }
  `)
  const { frontmatter, rawMarkdownBody } = data.markdownRemark
  return (
    <AboutStyles>
      <h1>{frontmatter.title}</h1>
      <p>{rawMarkdownBody}</p>
    </AboutStyles>
  )
}
