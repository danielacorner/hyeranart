import React from "react"
import AboutPageTemplate from "../../templates/aboutPageTemplate"

const AboutPagePreview = ({ entry, widgetFor }) => (
  <AboutPageTemplate
    title={entry.getIn(["data", "title"])}
    content={widgetFor("body")}
  />
)

export default AboutPagePreview
