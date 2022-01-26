import gql from 'graphql-tag';

export default gql`
    query FetchSongDetail($songId: ID!) {
        song(id: $songId) {
        id,
        title,
        lyrics {
            id
            content
            likes
        }
        }
    }
`
