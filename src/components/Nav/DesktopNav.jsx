import React from "react"
import styled from "@emotion/styled"
import { NavLink } from "./NavLink"
import { Link } from "gatsby"
import { globalHistory } from "@reach/router"
import { BREAKPOINTS } from "../../utils/constants"
import { LinksUlStyles } from "./LinksUlStyles"

export const DESKTOPNAV_WIDTH = 122

export const SAATCHI_SECTION_LINK = {
  type: "section",
  text: "saatchiart",
  url: "https://www.saatchiart.com/hyeran",
  external: true,
}

export default function DesktopNav({ handleNavigate }) {
  const { location } = globalHistory
  const isOnSinglePaintingPage = location.pathname.includes("/paintings/")

  const isOnHomePage = location.pathname === "/"
  return (
    <DesktopNavStyles {...{ isOnSinglePaintingPage }}>
      <Link
        className="titleLink"
        to={"/"}
        state={{ shouldReload: isOnHomePage, isInternal: true }}
      >
        <h4>hyeran lee</h4>
      </Link>

      <LinksUlStyles className="linksUl">
        {isOnSinglePaintingPage
          ? null
          : [
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
    </DesktopNavStyles>
  )
}

const DesktopNavStyles = styled.div`
  height: fit-content;
  max-width: calc(980px + 30vw);
  font-size: 12px;
  font-family: system-ui;
  margin-top: ${(p) => (p.isOnSinglePaintingPage ? 26 : 18)}px;
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

      margin-left: auto;
      margin-bottom: -17px;
    }
  }

  @media (min-width: ${BREAKPOINTS.MOBILELG}px) {
    padding-right: 3em;
  }
  @media (min-width: ${680}px) {
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
      font-size: 1.25vw;
    }
    h4 {
      font-size: 2.7em;
    }
  }
`
