import React from 'react';
import styled from 'styled-components';
import { Intro } from './intro';

const PageWrapper = styled.div`
    height: 100vh;
    width: 100%;
    /* background-color: pink; */
`;

export function Home (props) {
    document.title = "HealthGram - Home"

    return <PageWrapper><Intro/></PageWrapper>
}
