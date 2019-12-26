import React from "react"
import styled from "styled-components/macro"
import { camelCase } from "lodash"

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

export const LINK_CSS = `
  a {
    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    text-decoration: none;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.03);
    color: black;
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
    padding:4px;
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
  ${LINK_CSS}
  a {
    &.section {
      color: #999999;
    }
  }
  li {
    width: fit-content;
    list-style-type: none;
    line-height: normal;
  }
`

export const SECTION_LINKS = [
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
  {
    type: "collection",
    text: "Coexistence III",
    url: "https://hyeran.ca/Coexistence-III",
  },
  {
    type: "collection",
    text: "Coexistence II",
    url: "https://hyeran.ca/Coexistence-II-1",
  },
  {
    type: "collection",
    text: "Coexistence I",
    url: "https://hyeran.ca/Coexistence-I",
  },
  {
    type: "collection",
    text: "Correlation III",
    url: "https://hyeran.ca/Correlation-III",
  },
  {
    type: "collection",
    text: "Correlation II",
    url: "https://hyeran.ca/Correlation-II",
  },
  {
    type: "collection",
    text: "Correlation I",
    url: "https://hyeran.ca/Correlation-I",
  },
  { type: "collection", text: "Life", url: "https://hyeran.ca/Life" },
  {
    type: "collection",
    text: "Be Yourself",
    url: "https://hyeran.ca/Be-Yourself",
  },
  {
    type: "collection",
    text: "Self Portrait",
    url: "https://hyeran.ca/Self-Portrait",
  },
  {
    type: "collection",
    text: "Interaction",
    url: "https://hyeran.ca/Interaction",
  },
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

export default () => (
  <SideNavStyles>
    <ul>
      {ALL_LINKS.map(({ type, url, text }) => (
        // TODO: replace with Link once in-site
        <li className={camelCase(text)}>
          <a
            className={`${camelCase(text)} ${type}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        </li>
      ))}
    </ul>
  </SideNavStyles>
)
