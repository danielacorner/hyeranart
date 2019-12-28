import React from "react"
import Layout from "../components/Layout"
import styled from "styled-components/macro"
import MasonryGrid from "../components/Masonry/MasonryGrid"
import { useImagesQuery } from "../utils/queries"

const CollectionStyles = styled.div`
  padding-top: 70px;
  padding-left: 70px;
  h1 {
    font-size: 24px;
    font-weight: normal;
    font-family: "Carme", sans-serif;
  }
`

export default function Template({ pageContext }) {
  const { images, title, moreInfo, saatchiLink } = pageContext
  const { imagesDataArr } = useImagesQuery()
  console.log("🌟🚨: Template -> imagesDataArr", imagesDataArr)
  console.log("🌟🚨: Template -> images", images)
  const imageTitlesArr = images.map(img => img.Image)
  const imagesDataArrForCollection = imagesDataArr.filter(image =>
    imageTitlesArr.includes(image.title)
  )
  return (
    <Layout>
      <CollectionStyles>
        <div className="blog-post">
          <h1>{title}</h1>
          <MasonryGrid imagesDataArr={imagesDataArrForCollection} />
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: moreInfo }}
          />
        </div>
      </CollectionStyles>
    </Layout>
  )
}
