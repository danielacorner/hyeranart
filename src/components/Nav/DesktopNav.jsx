import React, { useContext } from "react"
import styled from "styled-components"
import { camelCase } from "lodash"
import { Link, navigate } from "gatsby"
import {
  GlobalDispatchContext,
  NAVIGATE_PAGE,
} from "../../context/GlobalContextProvider"
import { globalHistory } from "@reach/router"
import { UNDERLINE_ACTIVE_CSS, HOVER_UNDERLINE_CSS } from "../SplashPageCover"

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
    font-family: "Avenir";
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
  // const { collectionsDataArr } = useImagesQuery()

  // const collectionLinksArr = collectionsDataArr.map(({ title, images }) => ({
  //   type: "collection",
  //   text: title,
  //   url: `/collections/${kebabCase(title)}`,
  //   images: images,
  // }))

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
    // SAATCHI_SECTION_LINK,
    // ...sectionsDataArr.map(({ title }) => ({
    //   type: "section",
    //   text: title,
    //   url: `/${kebabCase(title)}`,
    //   external: false,
    // })),
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
        {sectionLinksArr.map(({ type, url, text, external }, idx) => (
          <NavLink
            key={url}
            idx={idx}
            external={external}
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

export function NavLink({
  type,
  url,
  text,
  handleNavigate,
  external = false,
  idx,
}) {
  const path = globalHistory.location.pathname
  const isCurrent = `${url}` === path
  const dispatch = useContext(GlobalDispatchContext)
  const onNavigate = e => {
    e.preventDefault()
    dispatch({ type: NAVIGATE_PAGE, payload: idx })
    handleNavigate({ navigateFn: () => navigate(url), idx })
  }
  return (
    <li className={`${camelCase(text)}${isCurrent ? " current" : ""}`}>
      {external ? (
        <a
          className={`${camelCase(text)} ${type}${isCurrent ? " current" : ""}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ) : (
        <Link
          onClick={onNavigate}
          className={`${camelCase(text)} ${type}${isCurrent ? " current" : ""}`}
          to={url}
        >
          {text}
        </Link>
      )}
    </li>
  )
}
