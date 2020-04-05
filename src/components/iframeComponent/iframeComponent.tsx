import React, { FC } from 'react';
import classes from './iframeComponent.module.css';

interface Props {
    url: string;
    windowId: string;
    setHighestZIndex: () => void;
}

const IframeComponent: FC<Props> = ({ url, windowId, setHighestZIndex }) => {

    const removeMask = () => {
        const mask = document.getElementById(`maskId_${windowId}`);
        if (mask) {
            mask.style.display = 'none';
        }
        setHighestZIndex();
    };

    return (
        <div className={classes.iframeContainer}>

            <iframe src={url} frameBorder="0" sandbox="allow-modals allow-popups allow-scripts allow-same-origin allow-forms allow-pointer-lock" />

            <div className={classes.focusMask} id={`maskId_${windowId}`} onClick={removeMask} />

        </div>
    );
}

export default IframeComponent;