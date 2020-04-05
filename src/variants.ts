export const mainVariants = {
    hidden: {
        bottom: '3vh',
        right: '2vw'
    },
    visible: {
        bottom: '3vh',
        right: '2vw'
    },
    expand: {
        bottom: '5vh',
        right: '5vw'
    },
    close: {
        opacity: 0,
        x: 50,
        transition: {
            ease: "easeOut",
            duration: 0.3
        }
    }
};

export const iframeVariants = {
    initial: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.3,
            duration: 0.5
        }
    },
    // expand: {
    //     height: '90vh',
    //     width: '90vw',
    //     // opacity: [0, 0, 1]
    // },
    // unexpand: {
    //     height: '100%',
    //     width: '100%',
    //     // opacity: [0, 0, 1]
    // }
};