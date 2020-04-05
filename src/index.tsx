import React, { FC, useState, useRef, Fragment } from 'react';
import classes from './index.module.css';
import { Resizable, Size } from "re-resizable";
import { motion } from "framer-motion";
import WindowBar from './components/windowBar/windowBar';
import IframeComponent from './components/iframeComponent/iframeComponent';
import { mainVariants, iframeVariants } from './variants';

interface Props {
  /**
 * window title, MUST be Unique title
 */
  title: string;

  /**
* iframe url is optional.
*/
  iframeUrl?: string;

  onClose?: () => void;
}

const ReactWindow: FC<Props> = ({ title, iframeUrl = '', onClose, children }) => {

  if (!title) {
    throw "ReactWindow must have 'title'.";
  }

  if (!iframeUrl && !children) {
    throw "ReactWindow must have 'iframeUrl' or children.";
  }

  const [isExpand, setIsExpand] = useState(-1);
  const [zIndex, setIIndex] = useState(1000);
  const [isClose, setIsClose] = useState(false);
  const [isDragable, setIsDragable] = useState(true);
  const [isDraging, setIsDraging] = useState(-1);
  const [currentSize, setCurrentSize] = useState<Size>({ height: 540, width: 634 });
  const dragContainerReff = useRef<HTMLDivElement>(null);

  const resizeStopHandle = (_event: any, _direction: any, elementRef: HTMLDivElement, _delta: any) => {
    setCurrentSize({ height: elementRef.style.height, width: elementRef.style.width });
    setIsDragable(true);
  }

  const setHighestZIndex = () => {
    const zIndexes: number[] = [];

    document.querySelectorAll('div[class*="reactWindow"]')
      .forEach((element: HTMLDivElement) => zIndexes.push(Number(element.style.zIndex)));

    setIIndex(Math.max(...zIndexes) + 1);

    setWindowBarBackgroundColor();

    setIfarmeMasks();
  };

  const setWindowBarBackgroundColor = () => {
    const windowElement = document.querySelector(`div[class*="reactWindow"][id="${title}"] div[class*="windowBarContainer"]`) as HTMLDivElement;
    if (windowElement) {
      document.querySelectorAll('div[class*="reactWindow"] div[class*="windowBarContainer"]')
        .forEach((element: HTMLDivElement) => {
          element.style.backgroundColor = '#fafafa';
        });
      windowElement.style.backgroundColor = '#f5f5f5';
    }
  };


  const setIfarmeMasks = () => {
    document.querySelectorAll('div[class*="reactWindow"] div[class*="focusMask"]')
      .forEach((element: HTMLDivElement) => {
        if (element.id.indexOf(title) < 0) {
          element.style.display = 'block';
        }
      });
  };

  const closeWindow = () => {
    setIsClose(true);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Fragment>

      <div ref={dragContainerReff} className={classes.dragContainer} />

      <motion.div className={`${classes.reactWindow} ${isExpand > 0 && classes.reactWindowExpand}`} id={title} style={{ zIndex }}
        initial="hidden" animate={isClose ? 'close' : isExpand > 0 ? 'expand' : 'visible'} variants={mainVariants}
        drag={isDragable} dragConstraints={dragContainerReff} onDrag={() => setIsDraging(1)} onDragEnd={() => setIsDraging(0)}
        onMouseDown={setHighestZIndex}>

        <motion.div className={classes.windowContent}
          initial="initial" variants={iframeVariants} animate={isExpand < 0 ? 'visible' : isExpand > 0 ? 'expand' : 'unexpand'}>

          <Resizable className={classes.resizeContainer} size={isExpand > 0 ? { height: '100%', width: '100%' } : currentSize}
            defaultSize={currentSize} onResizeStart={() => setIsDragable(false)} onResizeStop={resizeStopHandle}
            enable={isExpand > 0 ? {} : { top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: true, topLeft: true }}
            minHeight={340} minWidth={634} maxHeight="90vh" maxWidth="90vw">

            <div onDoubleClick={() => setIsExpand(expand => expand > 0 ? 0 : 1)}>
              <WindowBar title={title} iframeUrl={iframeUrl} isExpand={isExpand} isDraging={isDraging} currentSize={currentSize}
                setIsExpand={setIsExpand} setIsClose={closeWindow} setIsDragable={setIsDragable} />
            </div>

            <div style={{ height: '100%', overflow: 'auto' }} onMouseEnter={() => setIsDragable(false)} onMouseLeave={() => setIsDragable(true)}>
              {iframeUrl ? (<IframeComponent url={iframeUrl} windowId={title} setHighestZIndex={setHighestZIndex} />) :
                (<div style={{ padding: '1em' }}>{children}</div>)}
            </div>

          </Resizable>

        </motion.div>

      </motion.div>

    </Fragment>
  );
}

export default ReactWindow;