import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleSidebarMenu } from '../store/sidebarMenu/actions';
import MainLayout from '../components/MainLayout';
import Timeline from '../containers/Timeline';
import Chart from '../containers/Chart';

const mapStateToProps = state => {
  return {
    drawerOpen: state.sidebarMenu.open,
    component: selectComponent(state.componentId)
  };
};

const selectComponent = component => {
    switch(component) {
        case -1:
          return Timeline;
        case 1:
          return Chart;
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
