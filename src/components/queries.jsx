import { graphql, useStaticQuery } from "gatsby"

export const useImagesQuery = () => {
  const data = useStaticQuery(graphql`
    query AllMarkdownQuery {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              title
              path
              date
              caption
              moreInfo
              price
              widthInches
              heightInches
              Image
            }
          }
        }
      }
      allFile(filter: { extension: { eq: "jpg" } }) {
        edges {
          node {
            id
            childImageSharp {
              fluid(maxWidth: 1240) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  `)

  const imagesDataArr = data.allMarkdownRemark.edges.map(d => ({
    ...d.node.frontmatter,
    id: d.node.id,
  }))
  const imagesArr = data.allFile.edges.map(d => ({
    ...d.node.childImageSharp.fluid,
    id: d.node.id,
  }))

  return { imagesDataArr, imagesArr }
}
