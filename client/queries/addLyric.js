import gql from 'graphql-tag';

export default gql`
    mutation AddLyric($lyric: String, $id: ID) {
        addLyricToSong(content: $lyric, songId: $id) {
        title
        }
    }
`