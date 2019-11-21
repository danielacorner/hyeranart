import React from "react"
import Masonry from "react-masonry-css"
import Img from "gatsby-image"
import styled from "styled-components/macro"
import { NAV_HEIGHT } from "../Carousel/CarouselStyles"
import { useStaticQuery, graphql } from "gatsby"

const GRID_GAP = 30

const MasonryStyles = styled.div`
  width: 100%;
  min-height: calc(100vh - ${NAV_HEIGHT}px);
  .masonry-grid {
    display: flex;
    margin-left: -${GRID_GAP}px; /* gutter size offset */
    width: auto;
  }
  .masonry-grid_column {
    padding-left: ${GRID_GAP}px; /* gutter size */
    background-clip: padding-box;
  }
  .gatsby-image-wrapper {
    margin-bottom: ${GRID_GAP}px;
  }
`

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
}

export default () => {
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
  // TODO: filter for only images that have info

  return (
    <MasonryStyles>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={"masonry-grid"}
        columnClassName={"masonry-grid_column"}
      >
        {imagesDataArr.map(
          ({ id, Image, caption, date, moreInfo, path, price, title }, idx) => (
            <Img key={id} fluid={imagesArr[idx]} />
          )
        )}
      </Masonry>
    </MasonryStyles>
  )
}
