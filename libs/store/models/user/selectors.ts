import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';
import { transformUser } from './transformers';

const user = defaultMemoize((state: RootState) =>
  transformUser.fromFB(state.user.data)
);
const isAuthenticated = createSelector(user, (user) => !!user?.id);

export { user, isAuthenticated };
