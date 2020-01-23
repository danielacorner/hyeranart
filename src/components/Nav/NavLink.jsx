import React from "react"
import { camelCase } from "lodash"
import { globalHistory } from "@reach/router"
import TransitionLink from "gatsby-plugin-transition-link"

export function NavLink({ type, url, text, idx }) {
  const path = globalHistory.location.pathname
  const isCurrent = `${url}` === path

  return (
    <TransitionLink
      exit={{
        length: 0.5,
      }}
      entry={
        {
          // delay: 0.5,
        }
      }
      className={`${camelCase(text)} ${type}${isCurrent ? " current" : ""}`}
      to={url}
      state={{ isInternal: true }}
    >
      <li className={`${camelCase(text)}${isCurrent ? " current" : ""}`}>
        {text}
      </li>
    </TransitionLink>
  )
}
