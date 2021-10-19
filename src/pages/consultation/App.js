import React from 'react';
import styled from 'styled-components'
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VideoPlayer from './components/VideoPlayer';
import Sidebar from './components/Sidebar';
import Notifications from './components/Notifications';


const ConstulationWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: orange;
`;

const App = () => {

  return (
    <ConstulationWrapper>
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
    </ConstulationWrapper>
  );
};

export default App;
