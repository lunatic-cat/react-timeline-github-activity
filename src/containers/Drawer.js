import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleSidebarMenu, changeStartDate } from '../store/sidebarMenu/actions';
import { changeComponent } from '../store/componentId/actions';
import SidebarMenu from '../components/SidebarMenu';

const mapStateToProps = state => {
  return {
    startDate: state.sidebarMenu.startDate,
    sidebarMenuOpen: state.sidebarMenu.open,
    component: state.componentId
  };
};

export class DrawerContainer extends Component {
  render() {
    const { startDate, sidebarMenuOpen, dispatch, component } = this.props;

    return (
      <SidebarMenu
        onChangeDate={date => dispatch(changeStartDate(date))}
        toggleSidebarMenu={toggle => dispatch(toggleSidebarMenu())}
        changeComponent={component => dispatch(changeComponent())}
        component={component}
        startDate={startDate}
        open={sidebarMenuOpen}
      />
    )
  }
};

export default connect(mapStateToProps)(DrawerContainer);
