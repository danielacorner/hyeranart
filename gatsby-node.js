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
              date
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
        "🌟🚨: exports.createPages -> node.frontmatter",
        node.frontmatter
      )
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
    }
  })
}

// convert markdown to html (e.g. moreInfo section)
const remark = require("remark")
const remarkHTML = require("remark-html")

exports.onCreateNode = ({ node }) => {
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
  return node
}
