import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleSidebarMenu, changeStartDate } from '../store/sidebarMenu/actions';
import SidebarMenu from '../components/SidebarMenu';

const mapStateToProps = state => {
  return {
    startDate: state.sidebarMenu.startDate,
    sidebarMenuOpen: state.sidebarMenu.open
  };
};

export class DrawerContainer extends Component {
  render() {
    const { startDate, sidebarMenuOpen, dispatch } = this.props;

    return <SidebarMenu
      onChangeDate={date => dispatch(changeStartDate(date))}
      toggleSidebarMenu={toggle => dispatch(toggleSidebarMenu())}
      startDate={startDate}
      open={sidebarMenuOpen} />
  }
};

export default connect(mapStateToProps)(DrawerContainer);
