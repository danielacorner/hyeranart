/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { kebabCase } = require("lodash")
const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const collectionPageTemplate = path.resolve(
    `src/templates/collectionTemplate.jsx`
  )

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              saatchiLink
              moreInfo
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
    // for collections (nodes with multiple images), create pages
    if (Boolean(node.frontmatter.images)) {
      console.log(
        "🌟🚨: exports.createPages -> node.frontmatter.title",
        kebabCase(node.frontmatter.title)
      )
      createPage({
        path: `/collections/${kebabCase(node.frontmatter.title)}`,
        component: collectionPageTemplate,
        context: {
          title: node.frontmatter.title,
          images: node.frontmatter.images,
          saatchiLink: node.frontmatter.saatchiLink,
          moreInfo: node.frontmatter.moreInfo,
        }, // additional data can be passed via context
      })
    }
  })
}
