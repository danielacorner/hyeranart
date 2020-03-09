import { graphql, useStaticQuery } from "gatsby"
import { kebabCase } from "lodash"

export const useImagesQuery = () => {
  const data = useStaticQuery(graphql`
    query AllMarkdownQuery {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              title
              visible
              order
              moreInfo
              width
              height
              date
              Image
              depth
              saatchiLink
              images {
                Image
              }
            }
          }
        }
      }
      desktopImage: allFile(filter: { extension: { eq: "jpg" } }) {
        edges {
          node {
            id
            relativePath
            childImageSharp {
              fluid(maxWidth: 1240, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
      mobileImage: allFile(filter: { extension: { eq: "jpg" } }) {
        edges {
          node {
            id
            relativePath
            childImageSharp {
              fluid(maxWidth: 500, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  `)

  const imagesArr = data.desktopImage.edges.map(({ node }) => ({
    ...node.childImageSharp.fluid,
    id: node.id,
    relativePath: node.relativePath,
  }))
  const imagesArrMobile = data.mobileImage.edges.map(({ node }) => ({
    ...node.childImageSharp.fluid,
    id: node.id,
    relativePath: node.relativePath,
  }))

  console.log(
    "🌟🚨: imagesArr",
    imagesArr.map(({ relativePath }) => cleanJpgFilePathForSearch(relativePath))
  )
  console.log(
    "🌟🚨: data.allMarkdownRemark.edges",
    data.allMarkdownRemark.edges.map(({ node }) => node.frontmatter.Image)
  )
  const allImagesDataArr = data.allMarkdownRemark.edges.map(({ node }) => ({
    ...node.frontmatter,
    id: node.id,
    // find matching image in imagesArr
    fluid: !node.frontmatter.Image
      ? null
      : imagesArr.find(({ relativePath }) =>
          cleanJpgFilePathForSearch(node.frontmatter.Image).includes(
            cleanJpgFilePathForSearch(relativePath)
          )
        ),
  }))
  const allImagesDataArrMobile = data.allMarkdownRemark.edges.map(
    ({ node }) => ({
      ...node.frontmatter,
      id: node.id,
      // find matching image in imagesArr
      fluid: !node.frontmatter.Image
        ? null
        : imagesArrMobile.find(({ relativePath }) =>
            cleanJpgFilePathForSearch(node.frontmatter.Image).includes(
              cleanJpgFilePathForSearch(relativePath)
            )
          ),
    })
  )

  // split into collections vs images
  const imagesDataArr = allImagesDataArr.filter(d => Boolean(d.fluid))
  const imagesDataArrMobile = allImagesDataArrMobile.filter(d =>
    Boolean(d.fluid)
  )

  const collectionsDataArr = allImagesDataArr
    .filter(d => Boolean(d.visible && d.images && d.title !== "Artworks"))
    // sort by date, most recent first
    .sort((prev, next) =>
      (prev.order || prev.order === 0) && (next.order || next.order === 0)
        ? prev.order - next.order
        : new Date(next.date).getTime() - new Date(prev.date).getTime()
    )

  const gallery = allImagesDataArr.find(d => d.title === "Artworks")
  const galleryImagesArr = gallery
    ? gallery.images.map(({ Image }) =>
        imagesDataArr.find(d => d.title === Image)
      )
    : []

  // const sectionsDataArr = data.allMarkdownRemark.edges
  //   .map(d => d.node.frontmatter)
  //   .filter(d => Boolean(!d.images && !d.Image))
  //   // sort by pageIndex
  //   .sort((prev, next) => prev.pageIndex - next.pageIndex)

  return {
    imagesDataArr,
    imagesDataArrMobile,
    collectionsDataArr,
    // sectionsDataArr,
    imagesArr,
    galleryImagesArr,
  }
}
function cleanJpgFilePathForSearch(string) {
  const lowerCaseString = string.toLowerCase()
  return kebabCase(lowerCaseString.slice(0, -4)) + lowerCaseString.slice(-4)
}
