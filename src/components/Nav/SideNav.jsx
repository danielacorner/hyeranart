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
export const SECTION_LINKS = [
  {
    type: "section",
    text: "Gallery",
    url: "gallery",
  },
  {
    type: "section",
    external: true,
    text: "saatchiart",
    url: "https://www.saatchiart.com/hyeran",
  },
  {
    type: "section",
    external: true,
    text: "About Hyeran",
    url: "https://hyeran.ca/About-Hyeran",
  },
  { type: "section", text: "Events", url: "https://hyeran.ca/Events" },
  { type: "section", text: "Contact", url: "https://hyeran.ca/Contact" },
]

export default ({ handleNavigate }) => {
  const { collectionsDataArr } = useImagesQuery()
  const COLLECTION_LINKS_ARR = collectionsDataArr.map(collection => ({
    type: "collection",
    text: collection.title,
    url: `collections/${kebabCase(collection.title)}`,
    images: collection.images,
  }))
  return (
    <SideNavStyles>
      <LinksUlStyles>
        {[...SECTION_LINKS, ...COLLECTION_LINKS_ARR].map(
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
