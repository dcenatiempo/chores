import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';

const user = defaultMemoize((state: RootState) => state.user.data);
const isAuthenticated = createSelector(user, (user) => !!user?.id);

export { user, isAuthenticated };
