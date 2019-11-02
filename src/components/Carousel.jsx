import React from "react"
import styled from "styled-components/macro"
import { useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { imagesQuery } from "./constants"

const CarouselStyles = styled.div`
  display: grid;
  grid-auto-flow: column;
  .img-wrapper {
  }
`

export default () => {
  const data = useStaticQuery(imagesQuery)
  console.log("⚡🚨: data", data)

  const images = [
    data.image1.childImageSharp.fluid,
    data.image2.childImageSharp.fluid,
    data.image3.childImageSharp.fluid,
    data.image4.childImageSharp.fluid,
    data.image5.childImageSharp.fluid,
    data.image6.childImageSharp.fluid,
  ]

  return (
    <CarouselStyles>
      {images.map((image, idx) => (
        <div className="img-wrapper">
          <Img key={idx} title={"hi"} fluid={image} />
        </div>
      ))}
    </CarouselStyles>
  )
}
