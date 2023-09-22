import React from "react"
import { BREAKPOINTS } from "../utils/constants"
import { GatsbyImage } from "gatsby-plugin-image"
import Markdown from "markdown-to-jsx"
import { useImagesQuery } from "../utils/queries"
import { useMediaQuery } from "@mui/material"
import styled from "@emotion/styled"

export default function NewsItem({ title, Image, content, date }) {
  console.log("🌟🚨 ~ file: NewsItem.js ~ line 10 ~ NewsItem ~ Image", Image)
  const { imagesDataArr, imagesDataArrMobile } = useImagesQuery()
  const isMobileOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILE}px)`)
  const newsItemImage = (
    isMobileOrLarger ? imagesDataArr : imagesDataArrMobile
  ).find((node) => node.Image === Image)

  console.log(
    "🌟🚨 ~ file: NewsItem.js ~ line 24 ~ NewsItem ~ newsItemImage.fluid",
    newsItemImage.fluid
  )
  return (
    <>
      <NewsItemImageStyles className="imageWrapper">
        {Image?.includes("https") ? (
          <img src={Image} />
        ) : newsItemImage ? (
          <GatsbyImage image={newsItemImage.fluid} alt={""} />
        ) : null}
      </NewsItemImageStyles>
      <div className="contentWrapper">
        <h2>{title}</h2>
        <div className="dateStamp">{formatDate(date)}</div>
        <div className="contentBody">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </>
  )
}
function formatDate(dateString) {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}
const NewsItemImageStyles = styled.div``
