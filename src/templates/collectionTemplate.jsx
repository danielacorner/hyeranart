import React from "react"

export default function Template({
  // data, // this prop will be injected by the GraphQL query below.
  images,
  title,
  moreInfo,
  saatchiLink,
}) {
  console.log("🌟🚨: saatchiLink", saatchiLink)
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: moreInfo }}
        />
      </div>
    </div>
  )
}
