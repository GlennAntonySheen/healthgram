import React from 'react';
import styled from 'styled-components';
import SideBar from './sideBar'
import Doctor from './doctor/index';

const PanelWrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    /* flex-direction: row;background-color: yellow; */
`;

export function AdminPanel (props) {
    return <PanelWrapper>
        <SideBar />
        <Doctor />
    </PanelWrapper>
}
