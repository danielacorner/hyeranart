import React from "react"
import { camelCase } from "lodash"
import { Link } from "gatsby"
import { globalHistory } from "@reach/router"

export function NavLink({ type, url, text, handleNavigate, idx }) {
  const path = globalHistory.location.pathname
  const isCurrent = `${url}` === path

  return (
    <Link
      className={`${camelCase(text)} ${type}${isCurrent ? " current" : ""}`}
      to={url}
      state={{ isInternal: true }}
    >
      <li className={`${camelCase(text)}${isCurrent ? " current" : ""}`}>
        {text}
      </li>
    </Link>
  )
}
