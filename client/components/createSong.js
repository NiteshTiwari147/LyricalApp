import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';

import songsFetchQuery from '../queries/fetchSongs';

class CreateSong extends Component {
    constructor(props) {
        super(props);

        this.state = { title: ''}
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                tittle: this.state.title
            },
            refetchQueries: [{ query: songsFetchQuery }]
        }).then( () => hashHistory.push('/'))
    }
    render() {
        return (
            <div className='container'>
                <Link to='/'>Back</Link>
                <h2>Create a new song</h2>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song title :</label>
                    <input
                    onChange = { event => this.setState({title : event.target.value})}
                    value = {this.state.title} 
                    />
                </form>
            </div>
        )
    }
}

const addSongMutation = gql`
    mutation AddSong($tittle: String) {
        addSong(title: $tittle) {
            id,
            title
        }
    }
`
export default graphql(addSongMutation)(CreateSong);