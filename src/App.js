import React, { Component, Suspense } from 'react';
import './App.scss';
import 'react-vertical-timeline-component/style.min.css';
import block from 'bem-cn';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';

const SetOrganization = React.lazy(() => import('./containers/SetOrg'));

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
        <Suspense fallback={<div className = {className('loader')}>Loading...</div>}>
          <SetOrganization />
        </Suspense>
      </MuiThemeProvider>
    );
  };
};

export default App;
