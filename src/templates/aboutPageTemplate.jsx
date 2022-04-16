import React from "react"
import styled from "styled-components/macro"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { BREAKPOINTS } from "../utils/constants"
import { AboutSubsections } from "./AboutSubsections"

const AboutPage = () => {
  // TODO optimize image query

  const data = useStaticQuery(graphql`
    query AboutPage {
      markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
        html
        frontmatter {
          title
          Image
        }
      }
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/about-subsection.+/" } }
        sort: { order: ASC, fields: frontmatter___order }
      ) {
        nodes {
          frontmatter {
            about_image_with_subtitle {
              about_subsection_image
              about_subsection_image_subtitle
            }
            text
            order
            title
          }
        }
      }
      profileImage: file(name: { eq: "Profile" }) {
        id
        childImageSharp {
          gatsbyImageData(
            quality: 100
            placeholder: TRACED_SVG
            layout: FULL_WIDTH
          )
        }
      }
      # allFile(filter: { absolutePath: { regex: "/about-subsection.+/" } }) {
      #   edges {
      #     node {
      #       childImageSharp {
      #         gatsbyImageData(
      #           quality: 100
      #           placeholder: TRACED_SVG
      #           layout: FULL_WIDTH
      #         )
      #       }
      #     }
      #   }
      # }
    }
  `)
  const { frontmatter, html } = data.markdownRemark
  const subsections = data.allMarkdownRemark.nodes
  // console.log(
  //   "🌟🚨 ~ file: aboutPageTemplate.jsx ~ line 53 ~ AboutPage ~ data",
  //   data
  // )

  return (
    <AboutPageTemplate
      {...{
        html,
        subsections,
        profileImage: data.profileImage,
      }}
    />
  )
}

export function AboutPageTemplate({ html, subsections, profileImage }) {
  return (
    <AboutStyles>
      <div className="imageAndTextWrapper">
        <div className="imageWrapper">
          {profileImage && (
            <GatsbyImage
              image={profileImage.childImageSharp.gatsbyImageData}
              alt="Hyeran Lee"
            />
          )}
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      <AboutSubsections {...{ subsections }} />
    </AboutStyles>
  )
}

export default AboutPage

const AboutStyles = styled.div`
  margin: 2em 5em 0 48px;
  .imageAndTextWrapper {
    .imageWrapper {
      padding-bottom: 2em;
    }

    @media (min-width: ${BREAKPOINTS.TABLET}px) {
      margin-left: auto;
      width: 66vw;
    }
  }
  .subsectionWrapper {
    margin-top: 4em;
    .subsection-title {
      font-style: italic;
      font-weight: 100;
      margin-bottom: 2rem;
      width: fit-content;
    }
    .title-and-image-and-caption {
      width: 100%;
      @media (min-width: ${BREAKPOINTS.TABLET}px) {
        margin-left: auto;
        width: 66vw;
      }
      .images-and-captions {
        margin-left: auto;
        display: grid;
        grid-gap: 3rem;
        width: 100%;
        .image-and-caption {
          margin-bottom: 1.5em;
          figcaption {
            margin: 0.5em auto 0;
            width: fit-content;
            font-size: 0.75em;
          }
        }
      }
    }
  }
`
