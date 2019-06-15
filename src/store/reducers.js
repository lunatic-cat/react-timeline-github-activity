import users from './users/reducer';
import organization from './organization/reducer';
import popupUi from './popupUi/reducer';
import sidebarMenu from './sidebarMenu/reducer';
import componentId from './componentId/reducer';

const reducers = {
    response: users,
    organization,
    popupUi,
    componentId,
    sidebarMenu
};

export default reducers;