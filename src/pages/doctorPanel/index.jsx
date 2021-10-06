import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

const DovtorPanelWrapper = styled.div`
    height: 200vh;
    width: 100vw;
    margin-top: 80px;
    display: flex;
    /* background-color: green; */
`;

export function DoctorPanel (props) {

    useEffect(() => {
        document.title = "Doctor Panel"
        const interval = setInterval(() => {
          console.log('This will run every second!');
        }, 3000);
        return () => clearInterval(interval);
      }, []);

    return <DovtorPanelWrapper>Doctor Panel</DovtorPanelWrapper>
}
