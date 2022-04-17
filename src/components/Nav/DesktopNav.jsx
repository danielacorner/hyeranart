import React from "react"
import styled from "styled-components"
import { NavLink } from "./NavLink"
import { Link } from "gatsby"
import { globalHistory } from "@reach/router"
import { useImagesQuery } from "../../utils/queries"
import { BREAKPOINTS } from "../../utils/constants"
import { LinksUlStyles } from "./LinksUlStyles"
import { kebabCase } from "lodash"

export const DESKTOPNAV_WIDTH = 122

const DesktopNavStyles = styled.div`
  height: fit-content;
  max-width: calc(980px + 30vw);
  font-size: 12px;
  font-family: system-ui;
  margin-top: 1.5em;
  padding: 0.5em 1em 0.5em 24px;
  position: relative;
  background: white;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  .titleLink {
    text-decoration: none;
    color: black;
  }

  li {
    width: fit-content;
    line-height: normal;
    margin-bottom: 0;
    text-transform: uppercase;
    display: flex;
    padding: 0;
    font-size: 1em;
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
    flex-shrink: 1;
    margin-top: 1.5em;
    gap: 1em;
    width: 100%;
    justify-content: space-evenly;
    @media (min-width: ${406}px) {
      width: fit-content;
      gap: 2.3em;
      flex-shrink: 0;
    }
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

  @media (min-width: ${BREAKPOINTS.MOBILELG}px) {
    padding-right: 3em;
  }
  @media (min-width: ${(props) =>
      props.shouldShowSaatchiLink ? 528 : 680}px) {
    ul.linksUl {
      width: fit-content;
    }
    flex-direction: row;
  }
  @media (min-width: 768px) {
    padding-right: 3em;
  }
  @media (min-width: 960px) {
    margin-top: 3em;
    padding: 1em 6em 1em 48px;
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
`

export const SAATCHI_SECTION_LINK = {
  type: "section",
  text: "saatchiart",
  url: "https://www.saatchiart.com/hyeran",
  external: true,
}

export default function DesktopNav({ handleNavigate }) {
  const { location } = globalHistory
  const isOnSinglePaintingPage = location.pathname.includes("/paintings/")
  const paintingNameFromUrl = location.pathname.split("/")[2]

  const isOnHomePage = location.pathname === "/"
  return (
    <DesktopNavStyles>
      <Link
        className="titleLink"
        to={"/"}
        state={{ shouldReload: isOnHomePage, isInternal: true }}
      >
        <h4>hyeran lee</h4>
      </Link>

      {isOnSinglePaintingPage ? (
        <SaatchiLink {...{ paintingNameFromUrl }} />
      ) : (
        <LinksUlStyles className="linksUl">
          {[
            {
              type: "section",
              text: "News",
              url: "/news",
            },
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
          ].map(({ type, url, text, subSections }, idx) => (
            <NavLink
              key={url}
              idx={idx}
              type={type}
              url={url}
              text={text}
              subSections={subSections}
              handleNavigate={handleNavigate}
            />
          ))}
        </LinksUlStyles>
      )}
    </DesktopNavStyles>
  )
}
function SaatchiLink({ paintingNameFromUrl }) {
  const { imagesDataArr } = useImagesQuery()
  const paintingData = imagesDataArr.find((imageData) => {
    return kebabCase(imageData.title) === kebabCase(paintingNameFromUrl)
  })
  const saatchiLink = paintingData ? paintingData.saatchiLink : null
  return saatchiLink ? (
    <SaatchiLinkStyles>
      <a href={saatchiLink} target="_blank" rel="noopener noreferrer">
        <li>Available on Saatchi Art</li>
      </a>
    </SaatchiLinkStyles>
  ) : null
}
const SaatchiLinkStyles = styled.div`
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
    text-decoration: underline;
    padding: 0.5rem;
    margin: -0.5rem;
    margin-top: 0.25rem;
  }
  li {
    list-style-type: none;
    padding: 4px;
    margin-bottom: 0.3rem;

    &:after {
      background: hsl(0, 0%, 60%);
    }
  }
`
