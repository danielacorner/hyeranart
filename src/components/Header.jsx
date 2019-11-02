import { Link } from "gatsby"
import React from "react"
import styled from "styled-components/macro"

const HeaderStyles = styled.header`
  height: 64px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1em;
  place-items: center center;
`

const pagesArr = [
  {
    name: "stack",
    path: "/stack",
  },
  {
    name: "carousel",
    path: "/carousel",
  },
  {
    name: "Works",
    path: "/works",
    // subPages: [
    //   { name: "Large", path: "/works/large" },
    //   { name: "Medium", path: "/works/medium" },
    //   { name: "Small", path: "/works/small" },
    // ],
  },
  {
    name: "About",
    path: "/about",
  },
]

export default () => (
  <HeaderStyles>
    {pagesArr.map(({ path, name, subPages }) => (
      <Link to={path}>{name}</Link>
    ))}
  </HeaderStyles>
)
