import React from "react"
import { BREAKPOINTS } from "../utils/constants"
import { GatsbyImage } from "gatsby-plugin-image"
import Markdown from "markdown-to-jsx"
import { useImagesQuery } from "../utils/queries"
import { useMediaQuery } from "@material-ui/core"

export default function NewsItem({ title, Image, content, date }) {
  const { imagesDataArr, imagesDataArrMobile } = useImagesQuery()
  const isMobileOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILE}px)`)
  const newsItemImage = (
    isMobileOrLarger ? imagesDataArr : imagesDataArrMobile
  ).find((node) => node.Image === Image)

  return (
    <>
      <div className="imageWrapper">
        {Image?.includes("https") ? (
          <img src={Image} />
        ) : newsItemImage ? (
          <GatsbyImage image={newsItemImage.fluid} alt={""} />
        ) : null}
      </div>
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
