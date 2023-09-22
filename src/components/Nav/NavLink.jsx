import React from "react"
import { camelCase } from "lodash"
import { globalHistory } from "@reach/router"
import CollapseNavLink from "./CollapseNavLink"
import { Link } from "gatsby"
import { CSSTransition } from "react-transition-group"

export function NavLink({ type, url, text, idx }) {
  const path = globalHistory.location.pathname
  const ccText = camelCase(text)
  const isCurrent =
    (`${url}` === path && !url.includes("/paintings/")) ||
    (ccText === "artworks" && path.includes("/collections/"))

  return (
    <li className={`navLink ${camelCase(text)}${isCurrent ? " active" : ""}`}>
      {url ? (
        <CSSTransition classNames="page-transition" timeout={500}>
          <Link
            to={url}
            state={{
              isInternal: true,
            }}
            className={`sectionLink ${ccText} ${type}${
              isCurrent ? " active" : ""
            }`}
          >
            {text}
          </Link>
        </CSSTransition>
      ) : (
        <CollapseNavLink {...{ type, text, isCurrent }} />
      )}
    </li>
  )
}
