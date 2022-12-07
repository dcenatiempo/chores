import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './Pager.module.css';
import useResizeObserver from 'use-resize-observer';
import Button from '../Button';
import { useScreenSize } from '../../../libs/store/appState/useAppState';

let timer: NodeJS.Timeout;

export interface PagerProps {
  children: React.ReactNode;
  pageIndex: number;
  onChangePageIndex: (pageIndex: number) => void;
  onChangePageCount?: (pageCount: number) => void;
}

export default function Pager({
  children,
  pageIndex,
  onChangePageIndex,
  onChangePageCount,
}: PagerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { width = 1, height = 1 } = useResizeObserver<HTMLDivElement>({
    ref: scrollContainerRef,
  });
  const _children = useMemo(() => {
    // @ts-expect-error
    return children?.filter((c) => !!c);
  }, [children]);
  const pageCount = _children.length || 0;
  // const totalWidth = width * pageCount;
  const _pageIndex = Math.min(pageIndex, pageCount - 1);

  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const isAutoScrollingRef = useRef(false);
  const isManualScrolling = useRef(false);

  useEffect(() => {
    onChangePageCount?.(pageCount);
  }, [onChangePageCount, pageCount]);

  useEffect(() => {
    if (isAutoScrollingRef.current) return;
    if (isManualScrolling.current) return;
    scrollTo(
      scrollContainerRef.current,
      width * _pageIndex,
      200,
      () => {
        isAutoScrollingRef.current = true;
        setIsAutoScrolling(true);
      },
      () => {
        isAutoScrollingRef.current = false;
        setIsAutoScrolling(false);
      }
    );
  }, [_pageIndex, width]);

  const onScroll = useCallback(
    (e: React.UIEvent) => {
      if (isAutoScrollingRef.current) return;

      isManualScrolling.current = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        isManualScrolling.current = false;
      }, 100);
      // @ts-expect-error
      const _width = e.nativeEvent.currentTarget?.offsetWidth || 1;
      // @ts-expect-error
      const scrollPos = e.nativeEvent.currentTarget?.scrollLeft || 0;
      const index = Math.round(scrollPos / _width);
      if (index !== _pageIndex) onChangePageIndex(index);
    },
    [_pageIndex, onChangePageIndex]
  );

  if (!_children) return null;
  return (
    <div
      className={`${styles.observableWidth} ${
        !isAutoScrolling ? styles.manualScrolling : ''
      }`}
      ref={scrollContainerRef}
      onScroll={onScroll}
    >
      {Array.isArray(_children)
        ? _children.map((c, i) => <Page key={`${i}`}>{c}</Page>)
        : _children}
    </div>
  );
}

export function PagerTabs({
  tabs,
  pageIndex,
  setPageIndex,
}: {
  tabs: string[];
  pageIndex: number;
  setPageIndex: (index: number) => void;
}) {
  const { isSmallScreen } = useScreenSize();

  return (
    <>
      {tabs.map((b, i) => (
        <Button
          type={pageIndex === i ? 'fill' : 'outline'}
          key={b}
          label={b}
          onClick={() => setPageIndex(i)}
          style={{ flex: isSmallScreen ? 1 : 'unset' }}
        />
      ))}
    </>
  );
}

function Page({ children }: { children: React.ReactNode }) {
  return <div className={styles.page}>{children}</div>;
}

// Element or Position to move + Time in ms (milliseconds)
function scrollTo(
  element: any,
  pos: number,
  duration: number,
  onStart?: () => void,
  onFinish?: () => void
) {
  scrollToC(element, element.scrollLeft, pos, duration, onStart, onFinish);
}

// Element to move, element or px from, element or px to, time in ms to animate
function scrollToC(
  element: any,
  from: number,
  to: number,
  duration: number,
  onStart?: () => void,
  onFinish?: () => void
) {
  if (duration <= 0) return;

  onStart?.();
  scrollToX(element, from, to, 0, 1 / duration, 16, motionFuncs[6], onFinish);
}

function scrollToX(
  element: any,
  xFrom: number,
  xTo: number,
  t01: number,
  speed: number,
  step: number,
  motion: (t: number) => number,
  onFinish?: () => void
) {
  if (t01 < 0 || t01 > 1 || speed <= 0) {
    element.scrollLeft = xTo;
    onFinish?.();
    return;
  }
  element.scrollLeft = xFrom - (xFrom - xTo) * motion(t01);

  setTimeout(() => {
    scrollToX(
      element,
      xFrom,
      xTo,
      t01 + speed * step,
      speed,
      step,
      motion,
      onFinish
    );
  }, step);
}

/* Effects List */
function linearTween(t: number) {
  return t;
}

function easeInQuad(t: number) {
  return t * t;
}

function easeOutQuad(t: number) {
  return -t * (t - 2);
}

function easeInOutQuad(t: number) {
  t /= 0.5;
  if (t < 1) return (t * t) / 2;
  t--;
  return (t * (t - 2) - 1) / 2;
}

function easeInCuaic(t: number) {
  return t * t * t;
}

function easeOutCuaic(t: number) {
  t--;
  return t * t * t + 1;
}

function easeInOutCuaic(t: number) {
  t /= 0.5;
  if (t < 1) return (t * t * t) / 2;
  t -= 2;
  return (t * t * t + 2) / 2;
}

function easeInQuart(t: number) {
  return t * t * t * t;
}

function easeOutQuart(t: number) {
  t--;
  return -(t * t * t * t - 1);
}

function easeInOutQuart(t: number) {
  t /= 0.5;
  if (t < 1) return 0.5 * t * t * t * t;
  t -= 2;
  return -(t * t * t * t - 2) / 2;
}

function easeInQuint(t: number) {
  return t * t * t * t * t;
}

function easeOutQuint(t: number) {
  t--;
  return t * t * t * t * t + 1;
}

function easeInOutQuint(t: number) {
  t /= 0.5;
  if (t < 1) return (t * t * t * t * t) / 2;
  t -= 2;
  return (t * t * t * t * t + 2) / 2;
}

function easeInSine(t: number) {
  return -Math.cos(t / (Math.PI / 2)) + 1;
}

function easeOutSine(t: number) {
  return Math.sin(t / (Math.PI / 2));
}

function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function easeInExpo(t: number) {
  return Math.pow(2, 10 * (t - 1));
}

function easeOutExpo(t: number) {
  return -Math.pow(2, -10 * t) + 1;
}

function easeInOutExpo(t: number) {
  t /= 0.5;
  if (t < 1) return Math.pow(2, 10 * (t - 1)) / 2;
  t--;
  return (-Math.pow(2, -10 * t) + 2) / 2;
}

function easeInCirc(t: number) {
  return -Math.sqrt(1 - t * t) - 1;
}

function easeOutCirc(t: number) {
  t--;
  return Math.sqrt(1 - t * t);
}

function easeInOutCirc(t: number) {
  t /= 0.5;
  if (t < 1) return -(Math.sqrt(1 - t * t) - 1) / 2;
  t -= 2;
  return (Math.sqrt(1 - t * t) + 1) / 2;
}

const motionFuncs = [
  linearTween,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCuaic,
  easeOutCuaic,
  easeInOutCuaic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInExpo,
  easeOutExpo,
  easeInOutExpo,
  easeInCirc,
  easeOutCirc,
  easeInOutCirc,
];
