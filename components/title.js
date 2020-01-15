import React from 'react'
import styled from '@emotion/styled'
import { breakpoint, lgreen } from './theme'

const H1 = styled.h1`    
    font-size: 2em;
    text-align: center;
    margin-top: 50px;

    @media (min-width: ${breakpoint}) {
        font-size: 3em;
    }
`

const Span = styled.span`
    color: ${lgreen};
`

export const Title = () => 
    <H1>Jetzt in einer Minute den <Span>kostenlosen Quick-Reminder</Span> erstellen.</H1>