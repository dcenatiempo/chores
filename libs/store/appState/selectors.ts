import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../store';

const IPHONE_7_PLUS_WIDTH = 476;

const appState = defaultMemoize((state: RootState) => state.appState);
const device = createSelector(appState, (state) => state.device);
const application = createSelector(appState, (state) => state.application);
const isSmallScreen = createSelector(
  device,
  (d) => d.screenWidth <= IPHONE_7_PLUS_WIDTH
);
const isDark = createSelector(device, (d) => d.isDark);

export { application, device, isSmallScreen, isDark };
