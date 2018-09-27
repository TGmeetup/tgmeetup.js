import React from 'react';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';
import { siteMetadata } from '../../gatsby-config';

const defaultSEO = {
  title: `TGmeetup`,
  description: `A collection set of technical groups' information (meetup)`,
  image: withPrefix('/logo.jpg'),
  url: siteMetadata.siteUrl,
}

/* TODO:
 *  refer to https://github.com/Vagr9K/gatsby-advanced-starter/blob/master/src/components/SEO/SEO.jsx
 */
export const defaultSchemaOrgJSONLD = {
  "@context": "http://schema.org",
  "@type": "WebSite",
  url: defaultSEO.url,
  name: defaultSEO.title,
}

export const eventToSEO = (event) => ({
  ...defaultSEO,
  type: 'event',
  title : `${event.name} - ${defaultSEO.title}`,
  image: event.group.logoURL || defaultSEO.image,
  description: `${event.group.title}\n${event.dateTime}\n${event.location}\n${event.local_city}`,
  url: `${defaultSEO.url}/events/${event.id}`,
});

export const eventListToSEO = (events) => ({
  ...defaultSEO,
  type: 'events',
  title: `Events - ${defaultSEO.title}`,
  description: `TGmeetup has ${events.length} events to share with you!`,
});

export const groupToSEO = (group) => ({
  ...defaultSEO,
  type: 'group',
  title: `${group.title} - ${defaultSEO.title}`,
  image: group.logoURL || defaultSEO.image,
  description: `${group.events.length} events on ${group.title}!\n${group.city}`,
  url: `${defaultSEO.url}/events/${group.id}`,
});

export const groupListToSEO = (groups) => ({
  ...defaultSEO,
  type: 'groups',
  title: `Groups - ${defaultSEO.title}`,
  description: `${groups.length} groups are on TGmeetup!`,
});

export const markerListToSEO = (markers) => ({
  ...defaultSEO,
  type: 'locations',
  title: `Places - ${defaultSEO.title}`,
  description: `${markers.length} places has events on TGmeetup!`,
});

export default ({ seo = defaultSEO }) => (
  <Helmet>
    <title>{seo.title}</title>

    <meta name="description" content={seo.description} />
    <meta name="image" content={seo.image}/>

    <meta property="og:url" content={seo.url} />
    { seo.type === 'post' && <meta property="og:type" content="article" /> }
    <meta property="og:title" content={seo.title}/>
    <meta property="og:description" content={seo.description} />
    <meta property="og:image" content={seo.image} />

    <meta name="twitter:title" content={seo.title} />
    <meta name="twitter:description" content={seo.description} />
    <meta name="twitter:image" content={seo.image} />
  </Helmet>
)
