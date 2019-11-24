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
              width
              height
              Image
            }
          }
        }
      }
      allFile(filter: { extension: { eq: "jpg" } }) {
        edges {
          node {
            id
            relativePath
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

  const imagesArr = data.allFile.edges.map(({ node }) => ({
    ...node.childImageSharp.fluid,
    id: node.id,
    relativePath: node.relativePath,
  }))
  console.log("⚡🚨: imagesArr", imagesArr)

  const imagesDataArr = data.allMarkdownRemark.edges.map(({ node }, idx) => ({
    ...node.frontmatter,
    id: node.id,
    // find matching image in imagesArr
    fluid: imagesArr.find(({ relativePath }) =>
      node.frontmatter.Image.includes(relativePath)
    ),
  }))
  console.log("⚡🚨: imagesDataArr", imagesDataArr)

  return { imagesDataArr, imagesArr }
}
