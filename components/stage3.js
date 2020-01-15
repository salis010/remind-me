import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import styled from '@emotion/styled'
import { breakpoint, lgreen, dgreen, dgrey } from './theme'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
`

const H2 = styled.h2`
    font-size: 2.4em;
    color: ${dgrey};
`

const Button = styled.button`
    width: 100%;
    height: 80px;
    margin-top: 50px;
    font-size: 1.4em;
    color: white;
    background-image: linear-gradient(${lgreen}, ${dgreen});
    border: 2px solid ${lgreen};
    border-radius: 1000px;
    outline: none;

    @media (min-width: ${breakpoint}) {
        width: 400px;
        font-size: 1.8em;
    }
`

export const Stage3 = props => {
    return (
        <Wrapper>
            <H2>Reminder Set!</H2>
            <Button onClick={() => props.setStage(1)}>Set a new reminder</Button>
        </Wrapper>
    )
}

Stage3.propTypes = {
    setStage: PropTypes.func.isRequired,
}
