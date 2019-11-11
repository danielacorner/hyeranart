import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

const HeaderStyles = styled.header`
  height: 64px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1em;
  place-items: center center;
`

const pagesArr = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "stack",
    path: "/stack",
  },
  {
    name: "carousel",
    path: "/carousel",
  },
  {
    name: "works",
    path: "/works",
    // subPages: [
    //   { name: "Large", path: "/works/large" },
    //   { name: "Medium", path: "/works/medium" },
    //   { name: "Small", path: "/works/small" },
    // ],
  },
  {
    name: "about",
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
