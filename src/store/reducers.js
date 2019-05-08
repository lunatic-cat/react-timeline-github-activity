import users from './users/reducer';
import organization from './organization/reducer';
import popupUi from './popupUi/reducer';

const reducers = {
    response: users,
    organization,
    popupUi
};

export default reducers;