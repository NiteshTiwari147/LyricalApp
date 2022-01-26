import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import songsFetchQuery from '../queries/fetchSongs';
import songDeleteQuery from '../queries/deleteSongs';

class SongList extends Component {

    deleteSong(songID) {
        this.props.mutate({
            variables: {
                songID
            },
            refetchQueries: [{ query: songsFetchQuery }]
        })
    }
    renderSongsList() {
        if(!this.props.data.loading) {
            return this.props.data.songs.map(song => 
                <li key={song.id} className='collection-item'>
                    <Link to={`/song/${song.id}`}>{song.title}</Link>
                    <i 
                    className='material-icons'
                    onClick={() => this.deleteSong(song.id)}>
                    delete
                    </i>

                </li>
                )
        }
        else {
            return <div>
                Loading.....
            </div>
        } 
    }
    render() {
       return (
        <div>
            <ul className='collection'>
                {this.renderSongsList()}
            </ul>
            <Link to='/create' className="btn-floating btn-large red right">
                <i className='material-icons'>add</i>
            </Link>
        </div>
       )
    }
}


export default graphql(songDeleteQuery)(
    graphql(songsFetchQuery)(SongList));