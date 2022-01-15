import React from "react"
import styled from "styled-components"
import { UNDERLINE_ACTIVE_CSS, HOVER_UNDERLINE_CSS } from "../SplashPageCover"
import { NavLink } from "./NavLink"
import { Link } from "gatsby"
import { globalHistory } from "@reach/router"
import { useImagesQuery } from "../../utils/queries"
import { getPaintingUrlFromFilePath } from "../AnimatedImage/AnimatedImage"
import { BREAKPOINTS } from "../../utils/constants"

export const LinksUlStyles = styled.ul`
  display: flex;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: 12px;
  @media (min-width: ${BREAKPOINTS.MOBILE}px) {
    margin-right: 0;
  }
  width: fit-content;
  a {
    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    text-decoration: none;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.03);
    color: black;
    &.saatchiart {
      text-decoration: underline;
    }
    &.theOtherArtFairBrooklyn {
      line-height: 1.4em;
    }
  }
  li {
    list-style-type: none;
    padding: 4px;
    margin-bottom: 0.3rem;
    ${HOVER_UNDERLINE_CSS}

    &:after {
      background: hsl(0, 0%, 60%);
    }
  }
  .sectionLink {
    padding: 0.5rem;
    margin: -0.5rem;
    &:active,
    &.current {
      color: #999999;
    }
    &.current {
      li {
        ${UNDERLINE_ACTIVE_CSS}
      }
      pointer-events: none;
    }
  }
`

export const DESKTOPNAV_WIDTH = 122

const DesktopNavStyles = styled.div`
  height: fit-content;
  max-width: calc(980px + 30vw);
  font-size: 12px;
  font-family: system-ui;
  margin-top: 1.5em;
  padding: 0.5em ${(props) => (props.shouldShowSaatchiLink ? "18px" : "1em")}
    0.5em 24px;
  position: relative;
  background: white;
  top: 0;
  .titleLink {
    text-decoration: none;
    color: black;
  }
  .sectionLink {
    margin-left: 1.5em;
  }
  li {
    width: fit-content;
    line-height: normal;
    margin-bottom: 0;
    text-transform: ${(props) =>
      props.shouldShowSaatchiLink ? "none" : "uppercase"};
    display: flex;
    padding: 0;
    font-size: ${(props) => (props.shouldShowSaatchiLink ? 1.2 : 1)}em;
  }
  h4 {
    cursor: pointer;
    white-space: nowrap;
    flex-grow: 1;
    margin: 0;
    letter-spacing: 0.8em;
    font-family: "AvenirRegular";
    font-size: 2em;
  }
  ul {
    flex-shrink: 0;
    margin-top: 1.5em;
    li {
      white-space: nowrap;
      ${(props) =>
        props.shouldShowSaatchiLink
          ? `
      margin-left: auto;
      margin-bottom: -17px;
      `
          : ""}
    }
  }
  display: flex;
  flex-direction: column;

  @media (min-width: ${BREAKPOINTS.MOBILELG}px) {
    padding-right: ${(props) => (props.shouldShowSaatchiLink ? "18px" : "3em")};
  }
  @media (min-width: ${(props) =>
      props.shouldShowSaatchiLink ? 528 : 680}px) {
    ul.linksUl {
      width: fit-content;
    }
    flex-direction: row;
  }
  @media (min-width: 768px) {
    padding-right: ${(props) => (props.shouldShowSaatchiLink ? "35px" : "3em")};
  }
  @media (min-width: 960px) {
    margin-top: 3em;
    padding: 1em ${(props) => (props.shouldShowSaatchiLink ? "35px" : "6em")}
      1em 48px;
    .sectionLink li {
      font-size: 1.25vw;
    }
    h4 {
      font-size: 2.5vw;
    }
  }
  @media (min-width: ${BREAKPOINTS.DESKTOPSM}px) {
    .sectionLink li {
      font-size: 1.35em;
    }
    h4 {
      font-size: 2.7em;
    }
  }
  display: flex;
  align-items: baseline;
`

export const SAATCHI_SECTION_LINK = {
  type: "section",
  text: "saatchiart",
  url: "https://www.saatchiart.com/hyeran",
  external: true,
}

export const useSectionCollectionLinks = () => {
  const sectionLinksArr = [
    {
      type: "section",
      text: "Energy & Freedom",
      url: "/",
    },
    {
      type: "section",
      text: "Artworks",
      url: null,
    },
    {
      type: "section",
      text: "About",
      url: "/about",
    },
  ]

  return {
    sectionLinksArr,
  }
}

export default ({ handleNavigate }) => {
  const { location } = globalHistory
  const isOnSinglePaintingPage = location.pathname.includes("/paintings/")
  const paintingNameFromUrl = location.pathname.split("/")[2]

  const { imagesDataArr } = useImagesQuery()
  const paintingData = imagesDataArr.find((imageData) => {
    const filePath = imageData.Image
    const pageUrl = getPaintingUrlFromFilePath(filePath)
    return pageUrl === paintingNameFromUrl
  })
  const saatchiLink = paintingData ? paintingData.saatchiLink : null
  console.log(
    "🌟🚨 ~ file: DesktopNav.jsx ~ line 193 ~ saatchiLink",
    saatchiLink
  )
  console.log(
    "🌟🚨 ~ file: DesktopNav.jsx ~ line 192 ~ paintingData",
    paintingData
  )
  const shouldShowSaatchiLink = Boolean(isOnSinglePaintingPage && saatchiLink)

  const { sectionLinksArr } = useSectionCollectionLinks()
  const isOnHomePage = location.pathname === "/"
  return (
    <DesktopNavStyles shouldShowSaatchiLink={shouldShowSaatchiLink}>
      <Link
        className="titleLink"
        to={"/"}
        state={{ shouldReload: isOnHomePage, isInternal: true }}
      >
        <h4>hyeran lee</h4>
      </Link>
      <LinksUlStyles className="linksUl">
        {shouldShowSaatchiLink ? (
          <a href={saatchiLink} target="_blank" rel="noopener noreferrer">
            <li>Available on Saatchi Art</li>
          </a>
        ) : (
          sectionLinksArr.map(({ type, url, text, subSections }, idx) => (
            <NavLink
              key={url}
              idx={idx}
              type={type}
              url={url}
              text={text}
              subSections={subSections}
              handleNavigate={handleNavigate}
            />
          ))
        )}
      </LinksUlStyles>
    </DesktopNavStyles>
  )
}
