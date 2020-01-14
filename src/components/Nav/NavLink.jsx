import React, { useContext } from "react"
import { camelCase } from "lodash"
import { Link, navigate } from "gatsby"
import {
  GlobalDispatchContext,
  NAVIGATE_PAGE,
} from "../../context/GlobalContextProvider"
import { globalHistory } from "@reach/router"

export function NavLink({ type, url, text, handleNavigate, idx }) {
  const path = globalHistory.location.pathname
  const isCurrent = `${url}` === path
  const dispatch = useContext(GlobalDispatchContext)
  const onNavigate = e => {
    e.preventDefault()
    dispatch({ type: NAVIGATE_PAGE, payload: idx })
    handleNavigate({
      navigateFn: () => navigate(url, { state: { prevPath: path } }),
    })
  }
  const isExternalUrl = url.includes("mailto")
  return (
    <li className={`${camelCase(text)}${isCurrent ? " current" : ""}`}>
      {isExternalUrl ? (
        <a
          className={`${camelCase(text)} ${type}${isCurrent ? " current" : ""}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ) : (
        <Link
          onClick={onNavigate}
          className={`${camelCase(text)} ${type}${isCurrent ? " current" : ""}`}
          to={url}
        >
          {text}
        </Link>
      )}
    </li>
  )
}
