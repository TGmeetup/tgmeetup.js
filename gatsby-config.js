module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: `Tgmeetup`,
    description: `A collection set of technical groups' information (meetup)`,
    siteUrl: `http://tgmeetup.github.io`,
    createAt: new Date('2018-09-28'),
    lastBuildDate: new Date(),
    // For RSS
    site_url: `http://tgmeetup.github.io`,
    feed_url: `http://tgmeetup.github.io/rss.xml`,
    image_url: `http://tgmeetup.github.io/logo.png`,
    categories: ['Tech', 'Community', 'Conference', 'Meet'],
    ttl: '60',
  },
  plugins: [
    `gatsby-source-tgmeetup`,
    // `gatsby-plugin-tgmeetup-google-calendar`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                feed_url
                site_url
                image_url
                categories
                pubDate: createAt(formatString: "ddd DD, YYYY HH:mm:ss GMT")
                lastBuildDate: lastBuildDate(formatString: "ddd DD, YYYY HH:mm:ss GMT")
                ttl
                categories
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, events } }) =>
              events.edges.map(edge => edge.node).map(event => ({
                  title: event.title,
                  description: `${event.group.title}\n${event.dateTime}\n${event.location}\n${event.local_city}`,
                  url: `${site.siteMetadata.site_url}/events/${event.id}`,
                  guid: event.id,
                  categories: event.group.keywords,
                  author: event.group.title,
                  date: event.date,
                  lat: event.geocode.lat,
                  long: event.geocode.lng,
                  comments: `${site.siteMetadata.site_url}/events/${event.id}`,
              })),
            query: `
            {
              events: allTgmeetupEvent(
                sort: { fields: [ dateTime ]}
              ) {
                edges {
                  node {
                    id
                    title
                    dateTime(formatString: "HH:mm MM/DD/YYYY (dddd)")
                    location
                    local_city
                    date: createAt(formatString: "MMM DD, YYYY")
                    geocode {
                      lat
                      lng
                    }
                    group {
                      title
                      keywords
                    }
                  }

                }
              }
            }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
  ]
}
