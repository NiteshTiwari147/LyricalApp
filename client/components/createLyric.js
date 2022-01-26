import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import fetchSongDetails from '../queries/fetchSongDetails';
import addLyricMutation from '../queries/addLyric';

class CreateLyric extends Component {
    constructor(props) {
        super(props);
        this.state = { content : ''}
    }
    onSubmit(event) {
        event.preventDefault();
        
        this.props.mutate({
            variables: {
                lyric: this.state.content,
                id: this.props.id
            },
            refetchQueries: [{ query: fetchSongDetails,
            variables: { songId: this.props.id} }]
        }).then( () => this.setState({content: ''}))
    }
    render () {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add Lyric</label>
                <input 
                value = {this.state.content} 
                onChange = {event => this.setState({ content: event.target.value})}
                />
            </form>
        )
    }
}

export default graphql(addLyricMutation)(CreateLyric);