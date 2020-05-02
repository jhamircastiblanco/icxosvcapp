/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOSvCApp = /* GraphQL */ `
  query GetOSvCApp($id: ID!) {
    getOSvCApp(id: $id) {
      id
      name
      description
    }
  }
`;
export const listOSvCApps = /* GraphQL */ `
  query ListOSvCApps(
    $filter: ModelOSvCAppFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOSvCApps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
      }
      nextToken
    }
  }
`;
