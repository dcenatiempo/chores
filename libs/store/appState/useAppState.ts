import { useDispatch, useSelector } from 'react-redux';
import * as selectors from './selectors';
import { actions } from './reducer';

export function useScreenSize() {
  const dispatch = useDispatch();
  const isSmallScreen = useSelector(selectors.isSmallScreen);
  const { screenWidth } = useSelector(selectors.device);

  function setScreenWidth(val: number) {
    dispatch(actions.setScreenWidth(val));
  }

  function setScreenHeight(val: number) {
    dispatch(actions.setScreenHeight(val));
  }

  function setScreenDimensions({
    height,
    width,
  }: {
    height: number;
    width: number;
  }) {
    dispatch(actions.setScreenHeight(height));
    dispatch(actions.setScreenWidth(width));
  }

  return {
    setScreenHeight,
    setScreenWidth,
    setScreenDimensions,
    isSmallScreen,
    screenWidth,
  };
}

export function useDarkMode() {
  const dispatch = useDispatch();
  const isDark = useSelector(selectors.isDark);

  function setIsDark(val: boolean) {
    dispatch(actions.setIsDark(val));
  }

  return {
    isDark,
    setIsDark,
  };
}

export function useKidMode() {
  const dispatch = useDispatch();
  const { isKidMode, kidModePin } = useSelector(selectors.application);

  function toggleKidMode(pin: string) {
    const newPin = isKidMode ? undefined : pin;
    if (isKidMode && pin !== kidModePin) return false;
    dispatch(actions.toggleKidMode(newPin));
    return true;
  }

  return {
    isKidMode,
    toggleKidMode,
  };
}
