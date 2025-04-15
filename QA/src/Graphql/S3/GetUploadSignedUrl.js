import { gql } from 'graphql-tag';


export const GETUPLOADSIGNEDURL = gql`
    query GetUploadSignedUrl($bucketName: String!, $key: String!){
    getUploadSignedUrl(bucketName: $bucketName, key: $key){
      preSignedUrl
      region
    }
}`