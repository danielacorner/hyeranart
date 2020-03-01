import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const AboutPage = () => {
  const data = useStaticQuery(graphql`
    query AboutPageTemplate {
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
  console.log("🌟🚨: AboutPage -> data", data)
  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={data.frontmatter.title}
        content={data.html}
      />
    </Layout>
  )
}

export default AboutPage
