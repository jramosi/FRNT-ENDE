import { useState } from 'react';
import ReactPlayer from 'react-player'
let positionVideo = 0;

const MultimediaDefault = (props) => {

    const { urlsVideos = [] } = props;
    const [currentVideo, setCurrentVideo] = useState(urlsVideos.length > 0 ? urlsVideos[0] : "")


    const handleChangeVideo = () => {
        positionVideo++;
        if (positionVideo >= urlsVideos.length) {
            positionVideo = 0;
        }
        setCurrentVideo([urlsVideos[positionVideo]])
    }

    if (urlsVideos.length <= 0) {
        return <></>
    }

    return (
        <div className="player-wrapper" style={{ width: '100%', height: '100%' }}>
            <ReactPlayer
                playing={true}
                muted={true}
                style={{
                    overflowY: 'hidden',
                    margin: '0 auto'
                }}
                onEnded={() => { handleChangeVideo() }}
                controls={false}
                width="100%"
                height="100%"
                url={currentVideo}
            />
        </div>
    )
}

export default MultimediaDefault