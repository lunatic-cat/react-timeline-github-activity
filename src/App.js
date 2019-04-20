import React, { Component } from 'react';
import './App.scss';
import 'react-vertical-timeline-component/style.min.css';
import DataFetcher from './containers/Fetcher';
import block from 'bem-cn';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';

export const className = block('timeline');

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: blue,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <DataFetcher />
      </MuiThemeProvider>
    );
  };
};

export default App;
