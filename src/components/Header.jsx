import React from "react"
import styled from "styled-components"

const HeaderStyles = styled.header`
  h1 {
    margin: 1em 0 0;
    text-align: center;
    font-family: "Carme", sans-serif;
  }
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
    <h1>Hyeran</h1>
  </HeaderStyles>
)
