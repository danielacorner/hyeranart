import { Link } from "gatsby"
import React from "react"

const DropdownLinkMenu = ({ path, name, subPages }) => <div>hi</div>

export default ({ siteTitle, pagesArr }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      {pagesArr.map(({ path, name, subPages }) =>
        subPages ? (
          <DropdownLinkMenu path={path} name={name} subPages={subPages} />
        ) : (
          <Link to={path}>{name}</Link>
        )
      )}
    </div>
  </header>
)
