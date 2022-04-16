import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useImagesQuery } from "../utils/queries"
import { useMediaQuery } from "@material-ui/core"
import { BREAKPOINTS } from "../utils/constants"

export function AboutSubsections({ subsections }) {
  return (
    <>
      {subsections.map(({ frontmatter: subFrontmatter }, idx) => {
        const { title, about_image_with_subtitle, text } = subFrontmatter

        return (
          <div key={idx} className="subsectionWrapper">
            <div className="title-and-image-and-caption">
              <h3 className="subsection-title">{title}</h3>
              <div
                className="images-and-captions"
                style={{
                  gridTemplateColumns: about_image_with_subtitle
                    .map(() => "1fr")
                    .join(" "),
                }}
              >
                {about_image_with_subtitle.map(
                  ({
                    about_subsection_image,
                    about_subsection_image_subtitle,
                  }) => (
                    <AboutImageWithSubtitle
                      {...{
                        about_subsection_image,
                        about_subsection_image_subtitle,
                        title,
                      }}
                    />
                  )
                )}
              </div>
            </div>
            {/* <Image image={} */}
            <p className="subsection-text">{text}</p>
          </div>
        )
      })}
    </>
  )
}
function AboutImageWithSubtitle({
  about_subsection_image,
  about_subsection_image_subtitle,
  title,
}) {
  const isTabletOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.TABLET}px)`)
  const { imagesArr } = useImagesQuery()
  // console.log(
  //   "🌟🚨 ~ TODO file: AboutSubsections.jsx ~ line 56 ~ imagesArr",
  //   imagesArr
  // )
  const image = imagesArr.find(({ relativePath }) => {
    return `images/uploads/${relativePath}` === about_subsection_image
  })
  const hasNoTitle = !title
  return (
    <div
      className="image-and-caption"
      key={about_subsection_image}
      style={
        hasNoTitle
          ? {
              width: "75%",
              ...(isTabletOrLarger
                ? { marginLeft: "auto" }
                : { margin: "auto" }),
            }
          : {}
      }
    >
      {image && (
        <GatsbyImage
          image={image}
          alt={about_subsection_image_subtitle || ""}
        />
      )}
      <figcaption>{about_subsection_image_subtitle}</figcaption>
    </div>
  )
}
