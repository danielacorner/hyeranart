import React from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import { useMediaQuery } from "@material-ui/core"
import { BREAKPOINTS } from "../utils/constants"

const SectionStyles = styled.div`
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
  img {
    width: 100%;
    height: auto;
  }
  max-width: 960px;
  margin-bottom: 6em;
`

export default function Template({ pageContext }) {
  const { title, moreInfo } = pageContext
  const isMobileOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILE}px)`)

  return (
    <Layout>
      <SectionStyles>
        <div
          style={{
            display: "flex",
            flexDirection: isMobileOrLarger ? "row" : "column",
            alignItems: "baseline",
          }}
        >
          <h1
            style={{
              flexGrow: 1,
              ...(isMobileOrLarger ? {} : { marginBottom: "0.5em" }),
            }}
          >
            {title}
          </h1>
        </div>
        <div
          className="sectionInfo"
          dangerouslySetInnerHTML={{ __html: moreInfo }}
        />
      </SectionStyles>
    </Layout>
  )
}
