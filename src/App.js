import React, { Component } from 'react';
import './App.css';
import 'react-vertical-timeline-component/style.min.css';
import Timeline from './components/Timeline'
import fetch from 'cross-fetch';
import Loader from 'react-loader-spinner'
import LoadingOverlay from 'react-loading-overlay';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      response: null,
      fetched: false,
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    fetch('//api.github.com/users/ByJIKaHkaz/events')
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then(body => this.setState({ response: body, fetched: true }))
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { response, fetched } = this.state;
    return (
      <LoadingOverlay active={!fetched} spinner={<Loader type="Puff" color="#aaaaaa" height={80} width={80} />}>
        {<Timeline response={response} />}
      </LoadingOverlay>
    );
  }
}

export default App;
