import React from "react"
import styled from "styled-components/macro"
import { camelCase, kebabCase } from "lodash"
import { useImagesQuery } from "../../utils/queries"
import { Link, navigate } from "gatsby"

// export const HOVER_UNDERLINE_LI_CSS = `
//     width: fit-content;
//     position: relative;
//     &:after {
//       transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
//       position: absolute;
//       content: "";
//       height: 1px;
//       width: 0%;
//       left: 50%;
//       bottom: 0;
//       background: cornflowerblue;
//     }
//     &:hover {
//       &:after {
//         left: 0%;
//         width: 100%;
//       }
//     }
// `

export const LinksUlStyles = styled.ul`
  a {
    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    text-decoration: none;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.03);
    color: black;
    &.section {
      color: #999999;
    }
    &:active,
    &.current {
      color: white;
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
    &:hover {
      background: #ffff66;
    }
    &:active,
    &.current {
      background: black;
    }
  }
`

export const SIDENAV_WIDTH = 122

const SideNavStyles = styled.div`
  height: fit-content;
  width: ${SIDENAV_WIDTH}px;
  font-size: 12px;
  font-family: system-ui;
  position: sticky;
  top: 1em;
  margin-top: 3em;
  ul {
    width: 96px;
  }
  li {
    width: fit-content;
    line-height: normal;
  }
`

// TODO: pull section links from CMS
const GALLERY_SECTION_LINK = {
  type: "section",
  text: "Gallery",
  url: "gallery",
}

export const useSectionCollectionLinks = () => {
  const { collectionsDataArr, sectionsDataArr } = useImagesQuery()

  const collectionLinksArr = collectionsDataArr.map(({ title, images }) => ({
    type: "collection",
    text: title,
    url: `collections/${kebabCase(title)}`,
    images: images,
  }))

  const sectionLinksArr = [
    GALLERY_SECTION_LINK,
    ...sectionsDataArr.map(({ title, externalLink }) => ({
      type: "section",
      text: title,
      url: externalLink || kebabCase(title),
      external: Boolean(externalLink),
    })),
  ]
  console.log("⚡🚨: sectionLinksArr", sectionLinksArr)

  return {
    collectionLinksArr,
    sectionLinksArr,
  }
}

export default ({ handleNavigate }) => {
  const { sectionLinksArr, collectionLinksArr } = useSectionCollectionLinks()
  return (
    <SideNavStyles>
      <LinksUlStyles>
        {[...sectionLinksArr, ...collectionLinksArr].map(
          ({ type, url, text, external = false }, idx) => (
            <NavLink
              key={url}
              idx={idx}
              external={external}
              type={type}
              url={url}
              text={text}
              handleNavigate={handleNavigate}
            />
          )
        )}
      </LinksUlStyles>
    </SideNavStyles>
  )
}

export function NavLink({ type, url, text, handleNavigate, external, idx }) {
  const isCurrent = `/${url}` === window.location.pathname
  const onNavigate = e => {
    e.preventDefault()

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
