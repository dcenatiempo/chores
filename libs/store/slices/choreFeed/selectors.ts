import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';

const orgsChoreFeed = defaultMemoize(
  (state: RootState) => state.choreFeed.orgs
);

const currentOrgId = defaultMemoize(
  (state: RootState) => state.orgs.currentOrgId
);

const choreFeed = createSelector(
  orgsChoreFeed,
  currentOrgId,
  (orgsChoreFeed, currentOrgId) => orgsChoreFeed?.[currentOrgId || '']
);

export { choreFeed };
