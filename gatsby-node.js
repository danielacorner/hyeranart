/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { kebabCase } = require("lodash")
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const collectionPageTemplate = path.resolve(
    `src/templates/collectionTemplate.jsx`
  )
  const sectionPageTemplate = path.resolve(`src/templates/sectionTemplate.jsx`)
  const singlePaintingPageTemplate = path.resolve(
    `src/templates/singlePaintingPageTemplate.jsx`
  )

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
              saatchiLink
              moreInfo
              Image
              images {
                Image
              }
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    // section pages
    if (Boolean(!node.frontmatter.images && !node.frontmatter.Image)) {
      const { title, moreInfo /* pageIndex */ } = node.frontmatter
      createPage({
        path: `/${kebabCase(node.frontmatter.title)}`,
        component: sectionPageTemplate,
        context: {
          title,
          moreInfo,
          /* pageIndex, */
        }, // additional data can be passed via context
      })
    }

    // collection pages
    console.log(
      "🌟🚨: exports.createPages -> node.frontmatter",
      node.frontmatter
    )
    if (Boolean(node.frontmatter.images)) {
      const { saatchiLink, moreInfo, images, title, date } = node.frontmatter
      createPage({
        path: `/collections/${kebabCase(node.frontmatter.title)}`,
        component: collectionPageTemplate,
        context: {
          title,
          images,
          saatchiLink,
          moreInfo,
          date,
        }, // additional data can be passed via context
      })

      // image pages
      images.forEach(({ Image }) => {
        const imageName = Image
        createPage({
          path: `/paintings/${kebabCase(imageName)}`,
          component: singlePaintingPageTemplate,
          context: {
            collectionTitle: title,
            imageName,
            saatchiLink,
            moreInfo,
            date,
          }, // additional data can be passed via context
        })
      })
    }
  })
}

// convert markdown to html (e.g. moreInfo section)
// and create a node for the profile image in about/index.md
const remark = require("remark")
const remarkHTML = require("remark-html")

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (!node.frontmatter) {
    return node
  }
  const markdown = node.frontmatter.moreInfo
  if (markdown) {
    node.frontmatter.moreInfo = remark()
      .use(remarkHTML)
      .processSync(markdown)
      .toString()
  }

  if (node.internal.type === `MarkdownRemark`) {
    const { createNodeField } = actions

    const { frontmatter } = node
    if (frontmatter) {
      const { Image } = frontmatter
      if (Image) {
        if (Image.indexOf("/img") === 0) {
          frontmatter.gatsbyImage = path.relative(
            path.dirname(node.fileAbsolutePath),
            path.join(__dirname, "/static/", Image)
          )
        }
      }
    }

    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `gatsbyImage`,
      node,
      value,
    })
  }

  return node
}

// add types for images
exports.sourceNodes = ({ actions, schema }) => {
  const { createTypes } = actions
  createTypes(`
    type ImageSharpWithFluid {
      fluid: ImageSharpFluid
    }
    type ChildImageSharpFluid {
      childImageSharp: ImageSharpWithFluid
    }
    type MarkdownRemarkFrontmatter {
      gatsbyImage: ChildImageSharpFluid
    }
    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }
  `)
}
