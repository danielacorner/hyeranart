module.exports = {
  siteMetadata: {
    title: `Hyeran`,
    description: `Abstract paintings by Hyeran Lee`,
    author: `@danielacorner`,
    image: `/assets/hyeran1.png`,
    siteUrl: `https://www.hyeran.ca`,
  },
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `hyeranart`,
        short_name: `hyeranart`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `static/images/uploads`,
        path: `${__dirname}/static/images/uploads`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/markdown-collections`,
        name: `markdown-collections`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/markdown-paintings`,
        name: `markdown-paintings`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/markdown-about-subsections`,
        name: `markdown-about-subsections`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/markdown-news`,
        name: `markdown-news`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-image`,
    'gatsby-plugin-netlify',
    'gatsby-plugin-netlify-cms',
    // {
    //   resolve: "gatsby-plugin-netlify-cms",
    //   options: {
    //     modulePath: `${__dirname}/src/cms/cms.js`,
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
