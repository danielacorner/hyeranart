import React from "react"
import styled from "styled-components"
import { UNDERLINE_ACTIVE_CSS, HOVER_UNDERLINE_CSS } from "../SplashPageCover"
import { NavLink } from "./NavLink"

export const LinksUlStyles = styled.ul`
  display: flex;
  margin-bottom: 0;

  a {
    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    text-decoration: none;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.03);
    color: black;
    &.section {
      color: #999999;
    }
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
      background: #999999;
    }
    &:active,
    &.current {
      ${UNDERLINE_ACTIVE_CSS}
    }
  }
`

export const DESKTOPNAV_WIDTH = 122

const DesktopNavStyles = styled.div`
  height: fit-content;
  font-size: 12px;
  font-family: system-ui;
  margin-top: 3em;
  padding: 1em 4em;
  position: sticky;
  background: white;
  top: 0;
  li {
    width: fit-content;
    margin-left: 1.5em;
    line-height: normal;
    margin-bottom: 0;
    text-transform: uppercase;
    font-size: 1.25vw;
    display: flex;
    padding: 0;
  }
  h4 {
    flex-grow: 1;
    margin: 0;
    letter-spacing: 0.8em;
    font-size: 2.5vw;
    font-family: "AvenirRegular";
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
  const { sectionLinksArr } = useSectionCollectionLinks()
  return (
    <DesktopNavStyles>
      <h4>hyeran lee</h4>
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
