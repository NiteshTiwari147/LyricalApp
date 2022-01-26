import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'; 

import SongList from './components/songList';
import CreateSong from './components/createSong';
import SongDetails from './components/songDetails';
import './style/style.css';

const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
         <Route path="/" component={SongList} />
         <Route path="/create" component={CreateSong} />
         <Route path="/song/:id" component={SongDetails} />
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
