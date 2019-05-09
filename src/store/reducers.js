import users from './users/reducer';
import organization from './organization/reducer';
import popupUi from './popupUi/reducer';
import sidebarMenu from './sidebarMenu/reducer';

const reducers = {
    response: users,
    organization,
    popupUi,
    sidebarMenu
};

export default reducers;