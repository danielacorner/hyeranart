import React from "react"
import styled from "styled-components"
import { UNDERLINE_ACTIVE_CSS, HOVER_UNDERLINE_CSS } from "../SplashPageCover"
import { globalHistory } from "@reach/router"
import { NavLink } from "./NavLink"
import { Link } from "gatsby"

export const LinksUlStyles = styled.ul`
  display: flex;
  margin-bottom: 0;

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
    &:active,
    &.current {
      a {
        color: #999999;
      }
      pointer-events: none;
      ${UNDERLINE_ACTIVE_CSS}
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
  padding: 0.5em 4em 0.5em 2em;
  position: sticky;
  background: white;
  top: 0;
  .titleLink {
    text-decoration: none;
    color: black;
  }
  li {
    width: fit-content;
    margin-left: 1.5em;
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
    flex-shrink: 0;
    margin-top: 1.5em;
    width: 100%;
    li {
      white-space: nowrap;
    }
  }
  display: flex;
  flex-direction: column;

  @media (min-width: 680px) {
    ul {
      width: fit-content;
    }
    flex-direction: row;
  }
  @media (min-width: 960px) {
    margin-top: 3em;
    padding: 1em 8em 1em 4em;
    li {
      font-size: 1.25vw;
    }
    h4 {
      font-size: 2.5vw;
    }
  }
  @media (min-width: 1300px) {
    li {
      font-size: 1.35em;
    }
    h4 {
      font-size: 2.7em;
    }
  }
  display: flex;
  align-items: baseline;
`

export const GALLERY_SECTION_LINK = {
  type: "section",
  text: "Artworks",
  url: "/artworks",
}
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
    GALLERY_SECTION_LINK,
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
  console.log("⚡🚨: globalHistory", globalHistory)
  const { sectionLinksArr } = useSectionCollectionLinks()
  return (
    <DesktopNavStyles>
      <Link className="titleLink" to={"/"} state={{ shouldReload: true }}>
        <h4>hyeran lee</h4>
      </Link>
      <LinksUlStyles>
        {sectionLinksArr.map(({ type, url, text }, idx) => (
          <NavLink
            key={url}
            idx={idx}
            type={type}
            url={url}
            text={text}
            handleNavigate={handleNavigate}
          />
        ))}
      </LinksUlStyles>
    </DesktopNavStyles>
  )
}
