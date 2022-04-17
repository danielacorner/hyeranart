import React from "react"
import { camelCase } from "lodash"
import { globalHistory } from "@reach/router"
import TransitionLink from "gatsby-plugin-transition-link"
import CollapseNavLink from "./CollapseNavLink"

export function NavLink({ type, url, text, idx }) {
  const path = globalHistory.location.pathname
  const ccText = camelCase(text)
  const isCurrent =
    (`${url}` === path && !url.includes("/paintings/")) ||
    (ccText === "artworks" && path.includes("/collections/"))

  return (
    <li className={`${camelCase(text)}${isCurrent ? " active" : ""}`}>
      {url ? (
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
          className={`sectionLink ${ccText} ${type}${
            isCurrent ? " active" : ""
          }`}
          to={url}
          state={{ isInternal: true }}
        >
          {text}
        </TransitionLink>
      ) : (
        <CollapseNavLink {...{ type, text, isCurrent }} />
      )}
    </li>
  )
}
