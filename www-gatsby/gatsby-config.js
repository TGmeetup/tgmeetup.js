module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    siteUrl: `http://tgmeetup.github.io`
  },
  plugins: [
    `gatsby-source-tgmeetup`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`
  ]
}
