import React from "react"
import { camelCase } from "lodash"
import { globalHistory } from "@reach/router"
import TransitionLink from "gatsby-plugin-transition-link"
import CollapseNavLink from "./CollapseNavLink"

export function NavLink({ type, url, text, idx }) {
  const path = globalHistory.location.pathname
  const isCurrent = `${url}` === path && !url.includes("/paintings/")
  console.log("🌟🚨 ~ file: NavLink.jsx ~ line 10 ~ NavLink ~ url", url)

  return url ? (
    <TransitionLink
      // https://transitionlink.tylerbarnes.ca/docs/transitionlink/
      exit={{
        length: 0.5,
      }}
      entry={
        {
          // delay: 0.5,
        }
      }
      className={`sectionLink ${camelCase(text)} ${type}${
        isCurrent ? " current" : ""
      }`}
      to={url}
      state={{ isInternal: true }}
    >
      <li className={`${camelCase(text)}${isCurrent ? " current" : ""}`}>
        {text}
      </li>
    </TransitionLink>
  ) : (
    <CollapseNavLink type={type} text={text} />
  )
}
