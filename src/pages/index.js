import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import SplashPageCover, {
  splashPageStyles,
} from "../components/SplashPageCover"
import Gallery from "../components/Masonry/Gallery"
import { animated, useSpring } from "react-spring"

if (process.env.NODE_ENV !== "production") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render")
  whyDidYouRender(React)
}

export default () => {
  const [isSplashPageClicked, setIsSplashPageClicked] = useState(false)
  const [isHomePageEntered, setIsHomePageEntered] = useState(false)

  const toggleOverflowHidden = isHidden => {
    if (isHidden) {
      document.querySelector("html").classList.add("overflowHidden")
    } else {
      document.querySelector("html").classList.remove("overflowHidden")
    }
  }

  useEffect(() => {
    toggleOverflowHidden(true)
    return () => {
      toggleOverflowHidden(false)
    }
  })

  const springSplashPage = useSpring({
    opacity: isSplashPageClicked ? 0 : 1,
    transform: `translateY(${isSplashPageClicked ? -64 : 0}px)`,
    onRest: () => {
      window.history.pushState("", "", "/home")
      setIsHomePageEntered(true)
      toggleOverflowHidden(false)
    },
  })

  const springHomePage = useSpring({
    opacity: isHomePageEntered ? 1 : 0,
    transform: `translateY(${isHomePageEntered ? 0 : -64}px)`,
  })

  const handleClick = () => {
    setIsSplashPageClicked(true)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <animated.div className="animatedWrapper homePage" style={springHomePage}>
        <Gallery />
      </animated.div>
      <animated.div
        className="animatedWrapper splashPage"
        style={{ ...splashPageStyles, ...springSplashPage }}
      >
        <SplashPageCover handleClick={handleClick} />
      </animated.div>
    </Layout>
  )
}
