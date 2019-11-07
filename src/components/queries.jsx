import { graphql, useStaticQuery } from "gatsby"

export const useImagesQuery = () => {
  const data = useStaticQuery(graphql`
    query {
      image1: file(relativePath: { eq: "hyeran1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1240) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      image2: file(relativePath: { eq: "hyeran2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1240) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      image3: file(relativePath: { eq: "hyeran3.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1240) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      image4: file(relativePath: { eq: "hyeran4.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1240) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      image5: file(relativePath: { eq: "hyeran5.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1240) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      image6: file(relativePath: { eq: "hyeran6.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1240) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)

  const images = [
    data.image1.childImageSharp.fluid,
    data.image2.childImageSharp.fluid,
    data.image3.childImageSharp.fluid,
    data.image4.childImageSharp.fluid,
    data.image5.childImageSharp.fluid,
    data.image6.childImageSharp.fluid,
  ]

  return images
}
