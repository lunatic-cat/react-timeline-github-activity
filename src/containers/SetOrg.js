import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeOrganization } from '../store/organization/actions';
import { togglePopup, changeOrganizationName } from '../store/popupUi/actions';
import Popup from '../components/Popup';
import DataFetcher from './Fetcher';

const mapStateToProps = state => {
  return {
    organization: state.organization,
    organizationName: state.popupUi.orgName,
    popupOpen: state.popupUi.open
  };
};


export class TimelineContainer extends Component {
  render() {
    const { organization, popupOpen, organizationName, dispatch } = this.props;

    return !organization
      ? <Popup
        onChangeOrg={orgName => dispatch(changeOrganization(orgName))}
        onChangeOrgName={orgName => dispatch(changeOrganizationName(orgName))}
        togglePopup={toggle => dispatch(togglePopup(toggle))}
        organizationName={organizationName}
        popupOpen={popupOpen} />
      : <DataFetcher />
  }
};

export default connect(mapStateToProps)(TimelineContainer);
