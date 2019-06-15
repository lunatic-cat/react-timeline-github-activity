import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleSidebarMenu } from '../store/sidebarMenu/actions';
import MainLayout from '../components/MainLayout';
import Timeline from '../containers/Timeline';

const mapStateToProps = state => {
  return {
    drawerOpen: state.sidebarMenu.open,
    component: selectComponent('Timeline') // Stub
  };
};

const selectComponent = component => {
    switch(component) {
        case 'Timeline':
          return Timeline;
        // case 'Chart':
        //     return Chart;
        default:
          return Timeline;
    };
};


export class MainContainer extends Component {
  render() {
    const { drawerOpen, dispatch, component } = this.props;

    return <MainLayout drawerOpen={drawerOpen} Component={component} toggleSidebarMenu={toggle => dispatch(toggleSidebarMenu())} />
  }
};

export default connect(mapStateToProps)(MainContainer);
