import React from "react"
import styled from "styled-components/macro"
import { useStaticQuery, graphql } from "gatsby"
import GatsbyImage from "gatsby-image"
import { useImagesQuery } from "../utils/queries"

const AboutStyles = styled.div`
  margin: 2em 5em 0 48px;
  .imageAndTextWrapper {
    .imageWrapper {
      padding-bottom: 2em;
    }

    @media (min-width: 768px) {
      margin-left: auto;
      width: 66vw;
    }
  }
`

const AboutPage = () => {
  const { imagesArr } = useImagesQuery()
  const data = useStaticQuery(graphql`
    query AboutPage {
      markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
        html
        frontmatter {
          title
          Image
        }
      }
    }
  `)
  const { frontmatter, html } = data.markdownRemark
  const profileImage = imagesArr.find(({ relativePath }) => {
    return `images/uploads/${relativePath}` === frontmatter.Image
  })
  return (
    <AboutPageTemplate
      html={html}
      profileImage={profileImage}
      frontmatter={frontmatter}
    />
  )
}

export function AboutPageTemplate({ profileImage, frontmatter, html }) {
  return (
    <AboutStyles>
      <div className="imageAndTextWrapper">
        <div className="imageWrapper">
          {profileImage && <GatsbyImage fluid={profileImage} />}
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </AboutStyles>
  )
}

export default AboutPage
