import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import { Link } from 'react-router';

import fetchSongDetails from '../queries/fetchSongDetails';
import CreateLyric from './createLyric';
import lyricLikeMutation from '../queries/lyricLikeMutation';

class SongDetails extends Component {

    onLike(lyricID) {
        this.props.mutate({
            variables: {
                id: lyricID
            },
            refetchQueries: [{ query: fetchSongDetails,
                variables: { songId: this.props.params.id} }]
        })
    }
    renderLyricList() {
        if(this.props.data.loading) {
            return (
                <div>
        
                </div>
            )
        }
        return this.props.data.song.lyrics.map(lyric => <li className='collection-item' key={lyric.id}>
            {lyric.content}
            <div className='like_btn'>
                <i className='material-icons likeIcon'
                onClick={() => this.onLike(lyric.id)}
                >
                    thumb_up
                </i>
                {lyric.likes}
            </div>
        </li>)
    }
    render() {

        const { song } = this.props.data;

        if(!song) {
            return <div>Loading....</div>
        }
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <ul className='collection'>
                {this.renderLyricList()}
                </ul>
                <CreateLyric id={song.id}/>
            </div>
        )
    }
}

export default graphql(lyricLikeMutation)(graphql(fetchSongDetails, {
    options: (props) => { return { variables: { songId: props.params.id }}}
})(SongDetails));