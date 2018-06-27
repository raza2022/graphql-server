import { ApolloProvider } from "react-apollo";
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Courses from './Courses'

import ApolloClient from "apollo-boost";
const client = new ApolloClient({
    uri: "http://192.168.100.19:5000/graphql"
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <div className="container">
                <nav className="navbar navbar-dark bg-primary">
                    <a className="navbar-brand" href="#">React and GraphQL - Sample Application</a>
                </nav>
                <div>
                    <Courses />
                </div>
            </div>
        </ApolloProvider>
    );
  }
}

export default App;
