import React from "react"
import Layout from "../components/Layout"
import styled from "styled-components/macro"
import MasonryGrid from "../components/Masonry/MasonryGrid"
import { useImagesQuery } from "../utils/queries"

const CollectionStyles = styled.div`
  padding-top: 70px;
  padding-left: 70px;
  .description {
    padding-right: 70px;
    margin-bottom: -40px;
    h1 {
      font-size: 24px;
      font-weight: normal;
      font-family: "Carme", sans-serif;
    }
  }
  .masonryWrapper {
    padding-bottom: 140px;
    margin-left: -36px;
  }
`

export default function Template({ pageContext }) {
  const { images, title, moreInfo, saatchiLink } = pageContext
  console.log(moreInfo)
  const { imagesDataArr } = useImagesQuery()
  const imageTitlesArr = images.map(img => img.Image)
  const imagesDataArrForCollection = imagesDataArr.filter(image =>
    imageTitlesArr.includes(image.title)
  )
  return (
    <Layout>
      <CollectionStyles>
        <div className="description">
          <h1>{title}</h1>
          <div
            className="collectionInfo"
            dangerouslySetInnerHTML={{ __html: moreInfo }}
          />
        </div>
        <div className="masonryWrapper">
          <MasonryGrid imagesDataArr={imagesDataArrForCollection} />
        </div>
      </CollectionStyles>
    </Layout>
  )
}
