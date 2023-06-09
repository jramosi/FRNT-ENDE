import React from 'react'
import { ExpandOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

/**
 * Button para poner el monitor en pantalla completa
 * @returns 
 */
const FullScreen = () => {

    const toggleFullScreen = (elem) => {
        if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
            if (elem.requestFullScreen) {
                elem.requestFullScreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullScreen) {
                elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    return (
        <Button
            type="text"
            shape="circle"
            icon={<ExpandOutlined />}
            size="large"
            style={{ position: 'absolute', zIndex: '11', right: 35, top: 5 }}
            onClick={() => toggleFullScreen(document.body)}
        />
    )
}

export default FullScreen