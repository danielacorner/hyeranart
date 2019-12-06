import React from "react"
import styled from "styled-components/macro"
import { Link } from "gatsby"

export const HOVER_UNDERLINE_LI_CSS = `
    list-style-type: none;
    width: fit-content;
    position: relative;
    &:after {
      transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
      position: absolute;
      content: "";
      height: 1px;
      width: 0%;
      left: 50%;
      bottom: 0;
      background: cornflowerblue;
    }
    &:hover {
      &:after {
        left: 0%;
        width: 100%;
      }
    }

`

const SideNavStyles = styled.div`
  height: fit-content;
  width: fit-content;
  font-size: 14px;
  font-family: system-ui;
  position: sticky;
  top: 1em;
  margin-top: 3em;
  a {
    text-decoration: none;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.03);
  }
  li {
    line-height: normal;
    ${HOVER_UNDERLINE_LI_CSS}
  }
`

export const SECTION_LINKS = [
  { text: "saatchiart", url: "http://www.saatchiart.com/hyeran" },
  { text: "About Hyeran", url: "http://hyeran.ca/About-Hyeran" },
  { text: "Events", url: "http://hyeran.ca/Events" },
  { text: "Contact", url: "http://hyeran.ca/Contact" },
]
export const COLLECTION_LINKS = [
  { text: "Coexistence III", url: "http://hyeran.ca/Coexistence-III" },
  { text: "Coexistence II", url: "http://hyeran.ca/Coexistence-II-1" },
  { text: "Coexistence I", url: "http://hyeran.ca/Coexistence-I" },
  { text: "Correlation III", url: "http://hyeran.ca/Correlation-III" },
  { text: "Correlation II", url: "http://hyeran.ca/Correlation-II" },
  { text: "Correlation I", url: "http://hyeran.ca/Correlation-I" },
  { text: "Life", url: "http://hyeran.ca/Life" },
  { text: "Be Yourself", url: "http://hyeran.ca/Be-Yourself" },
  { text: "Self Portrait", url: "http://hyeran.ca/Self-Portrait" },
  { text: "Interaction", url: "http://hyeran.ca/Interaction" },
  { text: "In-Flux", url: "http://hyeran.ca/In-Flux" },
  { text: "Exploration", url: "http://hyeran.ca/Exploration" },
  { text: "Remember", url: "http://hyeran.ca/Remember" },
  {
    text: "The Other Art Fair Brooklyn",
    url: "http://hyeran.ca/The-Other-Art-Fair-Brooklyn",
  },
]

const ALL_LINKS = [...SECTION_LINKS, ...COLLECTION_LINKS]

export default () => (
  <SideNavStyles>
    <ul>
      {ALL_LINKS.map(({ url, text }) => (
        <Link href={url} target="_blank" rel="noopener noreferrer">
          <li>{text}</li>
        </Link>
      ))}
    </ul>
  </SideNavStyles>
)
