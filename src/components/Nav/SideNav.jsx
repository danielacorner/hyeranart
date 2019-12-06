import React from "react"
import styled from "styled-components/macro"
import { Link } from "gatsby"

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
  }
  li {
    list-style-type: none;
    margin: 0;
  }
`

const LINKS = [
  { text: "saatchiart", url: "http://www.saatchiart.com/hyeran" },
  { text: "About Hyeran", url: "http://hyeran.ca/About-Hyeran" },
  { text: "Events", url: "http://hyeran.ca/Events" },
  { text: "Contact", url: "http://hyeran.ca/Contact" },
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

export default () => (
  <SideNavStyles>
    <ul>
      {LINKS.map(({ url, text }) => (
        <Link href={url} target="_blank" rel="noopener noreferrer">
          <li>{text}</li>
        </Link>
      ))}
    </ul>
  </SideNavStyles>
)
