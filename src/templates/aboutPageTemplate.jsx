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
  .subsectionWrapper {
    margin-top: 4em;
    .subsection-title {
      font-style: italic;
      font-weight: 100;
      margin-bottom: 2rem;
      width: fit-content;
    }
    .title-and-image-and-caption {
      width: fit-content;
      @media (min-width: 768px) {
        margin-left: auto;
        max-width: 66vw;
      }
      .images-and-captions {
        margin-left: auto;
        display: grid;
        grid-auto-flow: column;
        grid-gap: 3rem;
        width: fit-content;
        .image-and-caption {
          width: fit-content;
          margin-bottom: 1.5em;
          img {
            margin-bottom: 0.5em;
          }
          figcaption {
            margin: auto;
            width: fit-content;
            font-size: 0.75em;
          }
        }
      }
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
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/about-subsection.+/" } }
        sort: { order: ASC, fields: frontmatter___order }
      ) {
        nodes {
          frontmatter {
            gatsbyImage {
              childImageSharp {
                fluid {
                  originalImg
                }
              }
            }
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
    }
  `)
  const { frontmatter, html } = data.markdownRemark
  const subsections = data.allMarkdownRemark.nodes
  const profileImage = imagesArr.find(({ relativePath }) => {
    return `images/uploads/${relativePath}` === frontmatter.Image
  })
  return (
    <AboutPageTemplate
      html={html}
      profileImage={profileImage}
      frontmatter={frontmatter}
      subsections={subsections}
      imagesArr={imagesArr}
    />
  )
}

export function AboutPageTemplate({
  profileImage,
  frontmatter,
  html,
  subsections,
  imagesArr,
}) {
  return (
    <AboutStyles>
      <div className="imageAndTextWrapper">
        <div className="imageWrapper">
          {profileImage && <GatsbyImage fluid={profileImage} />}
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      {subsections.map(({ frontmatter }, idx) => {
        const { title, about_image_with_subtitle, text } = frontmatter

        return (
          <div key={idx} className="subsectionWrapper">
            <div className="title-and-image-and-caption">
              <h3 className="subsection-title">{title}</h3>
              <div className="images-and-captions">
                {about_image_with_subtitle.map(
                  ({
                    about_subsection_image,
                    about_subsection_image_subtitle,
                  }) => (
                    <div className="image-and-caption">
                      <img
                        src={about_subsection_image}
                        alt={about_subsection_image_subtitle}
                      />
                      <figcaption>{about_subsection_image_subtitle}</figcaption>
                    </div>
                  )
                )}
              </div>
            </div>
            {/* <Image fluid={} */}
            <p className="subsection-text">{text}</p>
          </div>
        )
      })}
    </AboutStyles>
  )
}

export default AboutPage
