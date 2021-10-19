import React, { useContext } from 'react';
import styled from 'styled-components'
import { SocketContext } from '../Context';

const VideoWrapper = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    background-color: red;
`;

const Video = styled.div`
    /* height: fit-content; */
    /* width: fit-content; */
    overflow: hidden;
    border-radius: 1rem;

    video {
        height: 100%;
    }
`;

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

  return (
    <VideoWrapper>
      {stream && (
        <Video>
            <video playsInline muted ref={myVideo} autoPlay />
        </Video>
      )}
      {callAccepted && !callEnded && (
        <Video>
            <video playsInline ref={userVideo} autoPlay />
        </Video>
      )}
    </VideoWrapper>
  );
};

export default VideoPlayer;
