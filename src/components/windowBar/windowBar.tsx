import React, { FC, Dispatch, SetStateAction } from 'react';
import classes from './windowBar.module.css';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import CropDinIcon from '@material-ui/icons/CropDin';
import CloseIcon from '@material-ui/icons/Close';
import LaunchIcon from '@material-ui/icons/Launch';
import { Size } from 're-resizable';

interface Props {
    title: string;
    iframeUrl: string;
    isExpand: number;
    isDraging: number;
    currentSize: Size;
    setIsExpand: Dispatch<SetStateAction<number>>;
    setIsClose: () => void;
    setIsDragable: Dispatch<SetStateAction<boolean>>;
}

const WindowBar: FC<Props> = ({ title, iframeUrl, isExpand, setIsExpand, isDraging, currentSize, setIsClose, setIsDragable }) => {

    const openInNewWindow = () => {
        window.open(iframeUrl, '_blank', `height=${currentSize.height},width=${currentSize.width}`);
        close();
    };

    const close = () => {
        setIsClose();

        setTimeout(() => {
            document.getElementById(title)?.remove();
        }, 750);
    };

    return (
        <div className={classes.windowBarContainer}>

            {isDraging > 0 && (<div style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1 }} />)}

            <div className={classes.title}>{title}</div>

            <div className={classes.buttonsContainer} onMouseEnter={() => setIsDragable(false)} onMouseLeave={() => setIsDragable(true)}>

                {iframeUrl && (<div className={classes.button} title="New Window" onClick={openInNewWindow}><LaunchIcon /></div>)}

                <div className={classes.button} title={`${isExpand > 0 ? 'Minimize' : 'Maximize'}`}
                    onClick={() => setIsExpand(expand => expand > 0 ? 0 : 1)}>
                    {isExpand > 0 ? (<FilterNoneIcon />) : (<CropDinIcon />)}
                </div>

                <div className={classes.button} title="Close" onClick={close}>
                    <CloseIcon />
                </div>

            </div>

        </div>
    );
}

export default WindowBar;