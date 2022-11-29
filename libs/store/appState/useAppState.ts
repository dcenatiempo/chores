import { useDispatch, useSelector } from 'react-redux';
import * as selectors from './selectors';
import { actions } from './reducer';

export default function useAppState() {
  const dispatch = useDispatch();
  const { isDark, isKidMode, kidModePin } = useSelector(selectors.appState);

  function setIsDark(val: boolean) {
    dispatch(actions.setIsDark(val));
  }
  function toggleKidMode(pin: string) {
    const newPin = isKidMode ? undefined : pin;
    if (isKidMode && pin !== kidModePin) return false;
    dispatch(actions.toggleKidMode(newPin));
    return true;
  }

  return {
    isDark,
    setIsDark,
    isKidMode,
    toggleKidMode,
  };
}
