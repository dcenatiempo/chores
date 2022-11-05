import { useDispatch, useSelector } from 'react-redux';
import * as selectors from './selectors';
import { actions } from './reducer';

export default function useAppState() {
  const dispatch = useDispatch();
  const { isDark } = useSelector(selectors.appState);
  function setIsDark(val: boolean) {
    dispatch(actions.setIsDark(val));
  }

  return {
    isDark,
    setIsDark,
  };
}
