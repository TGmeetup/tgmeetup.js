import React from 'react';
import { graphql } from 'gatsby';

import styled from 'styled-components';

import SEO, { markerListToSEO } from '../components/SEO';
import Map from '../components/Map';
import { headerHeight } from '../components/Header';
import { withLayout } from '../layouts';

const Wrapper = styled.div`
  height: calc(100vh - ${headerHeight});
  width: 100%;
`;

const Markers = ({ data: { markers }}) => (
  <Wrapper>
    <SEO seo={markerListToSEO(markers.edges.map(edge => edge.node))} />
    <Map markers={markers.edges.map(edge => edge.node)}/>
  </Wrapper>
)

export default withLayout(Markers);

export const query = graphql`
  query MarkersQuery {
    markers: allTgmeetupMarker {
      edges {
        node {
          id
          color
          latlng {
            lat
            lng
          }
          events {
            id
            name
            location
            dateTime
          }
        }
      }
    }
  }
`;
