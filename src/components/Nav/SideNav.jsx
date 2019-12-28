import React from "react"
import styled from "styled-components/macro"
import { camelCase, kebabCase } from "lodash"
import { useImagesQuery } from "../../utils/queries"
import { Link } from "gatsby"

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
    &:active {
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
    &:active {
      background: black;
    }
  }
`

const SideNavStyles = styled.div`
  height: fit-content;
  width: fit-content;
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

export const SECTION_LINKS = [
  {
    type: "section",
    text: "Home",
    url: "/",
  },
  {
    type: "section",
    text: "saatchiart",
    url: "https://www.saatchiart.com/hyeran",
  },
  {
    type: "section",
    text: "About Hyeran",
    url: "https://hyeran.ca/About-Hyeran",
  },
  { type: "section", text: "Events", url: "https://hyeran.ca/Events" },
  { type: "section", text: "Contact", url: "https://hyeran.ca/Contact" },
]
export const COLLECTION_LINKS = [
  { type: "collection", text: "In-Flux", url: "https://hyeran.ca/In-Flux" },
  {
    type: "collection",
    text: "Exploration",
    url: "https://hyeran.ca/Exploration",
  },
  { type: "collection", text: "Remember", url: "https://hyeran.ca/Remember" },
  {
    type: "collection",
    text: "The Other Art Fair Brooklyn",
    url: "https://hyeran.ca/The-Other-Art-Fair-Brooklyn",
  },
]

const ALL_LINKS = [...SECTION_LINKS, ...COLLECTION_LINKS]

export default () => {
  const { collectionsDataArr } = useImagesQuery()
  console.log("🌟🚨: collectionsDataArr", collectionsDataArr)
  const COLLECTION_LINKS_ARR = collectionsDataArr.map(collection => ({
    type: "collection",
    text: collection.title,
    url: `collections/${kebabCase(collection.title)}`,
    images: collection.images,
  }))
  console.log("🌟🚨: COLLECTION_LINKS_ARR", COLLECTION_LINKS_ARR)
  return (
    <SideNavStyles>
      <LinksUlStyles>
        {[...ALL_LINKS, ...COLLECTION_LINKS_ARR].map(({ type, url, text }) => (
          // TODO: replace with Link once in-site
          <li key={url} className={camelCase(text)}>
            <Link
              className={`${camelCase(text)} ${type}`}
              to={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {text}
            </Link>
          </li>
        ))}
      </LinksUlStyles>
    </SideNavStyles>
  )
}
