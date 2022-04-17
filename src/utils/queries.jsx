import { graphql, useStaticQuery } from "gatsby"
import { kebabCase } from "lodash"
import { useMemo } from "react"

// TODO replace with individual static queries https://www.qed42.com/insights/coe/javascript/querying-static-vs-dynamic-data-gatsby

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
              isSold
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
      desktopImage: allFile(
        filter: { extension: { in: ["webp", "png", "jpg"] } }
      ) {
        edges {
          node {
            id
            relativePath
            childImageSharp {
              gatsbyImageData(
                quality: 100
                placeholder: TRACED_SVG
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
      mobileImage: allFile(
        filter: { extension: { in: ["webp", "png", "jpg"] } }
      ) {
        edges {
          node {
            id
            relativePath
            childImageSharp {
              gatsbyImageData(
                width: 500
                quality: 100
                placeholder: TRACED_SVG
                layout: CONSTRAINED
              )
            }
          }
        }
      }
    }
  `)

  return useMemo(() => {
    const imagesArr = data.desktopImage.edges.map(({ node }) => ({
      ...node.childImageSharp.gatsbyImageData,
      id: node.id,
      relativePath: node.relativePath,
    }))
    const imagesArrMobile = data.mobileImage.edges.map(({ node }) => ({
      ...node.childImageSharp.gatsbyImageData,
      id: node.id,
      relativePath: node.relativePath,
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
    const gallery = allImagesDataArr.find((d) => d.title === "Artworks")
    const imagesDataArr = allImagesDataArr.filter((d) => Boolean(d.fluid))
    return {
      imagesArr,
      // split into ,collections vs images
      imagesDataArr,
      imagesDataArrMobile: allImagesDataArrMobile.filter((d) =>
        Boolean(d.fluid)
      ),
      collectionsDataArr: allImagesDataArr
        .filter((d) => Boolean(d.visible && d.images && d.title !== "Artworks"))
        // sort by date, most recent first
        .sort((prev, next) =>
          (prev.order || prev.order === 0) && (next.order || next.order === 0)
            ? prev.order - next.order
            : new Date(next.date).getTime() - new Date(prev.date).getTime()
        ),
      galleryImagesArr: gallery
        ? gallery.images.map(({ Image }) =>
            imagesDataArr.find((d) => d.title === Image)
          )
        : [],
    }
  }, [data])
}
function cleanJpgFilePathForSearch(string) {
  const lowerCaseString = string.toLowerCase()
  return kebabCase(lowerCaseString.slice(0, -4)) + lowerCaseString.slice(-4)
}
