import React, { Component } from 'react';
import './App.scss';
import 'react-vertical-timeline-component/style.min.css';
import DataFetcher from './containers/Fetcher';
import block from 'bem-cn';

export const className = block('timeline');

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: []
    }
  };

  render() {
    return (
      <DataFetcher />
    );
  };
};

export default App;
