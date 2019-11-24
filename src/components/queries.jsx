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
              depth
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

  const allImagesDataArr = data.allMarkdownRemark.edges.map(
    ({ node }, idx) => ({
      ...node.frontmatter,
      id: node.id,
      // find matching image in imagesArr
      fluid: !node.frontmatter.Image
        ? null
        : imagesArr.find(({ relativePath }) =>
            node.frontmatter.Image.includes(relativePath)
          ),
    })
  )
  console.log(
    "⚡🚨: data.allMarkdownRemark.edges",
    data.allMarkdownRemark.edges
  )
  // split into collections vs images
  const imagesDataArr = allImagesDataArr.filter(d => Boolean(d.fluid))
  const collectionsDataArr = allImagesDataArr.filter(d => !Boolean(d.fluid))

  return { imagesDataArr, collectionsDataArr, imagesArr }
}
