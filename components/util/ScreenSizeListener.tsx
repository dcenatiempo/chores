import { useEffect } from 'react';
import { useScreenSize } from '../../libs/store/appState/useAppState';
// https://size-charts.com/topics/screen-size-charts/apple-iphone-size/

let timer: NodeJS.Timeout;
export default function ScreenSizeListener({}) {
  const { setScreenDimensions } = useScreenSize();

  useEffect(() => {
    function onResize(e: UIEvent) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setScreenDimensions({
          // @ts-expect-error
          width: e.target.innerWidth,
          // @ts-expect-error
          height: e.target.innerHeight,
        });
      }, 100);
    }

    window.addEventListener('resize', onResize, true);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return null;
}
