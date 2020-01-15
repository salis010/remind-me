import React, { useState } from 'react'
import styled from '@emotion/styled'
import { breakpoint, lgrey, dgrey, fieldHMargin } from './theme'
import { fieldStatus } from './utils'

const Wrapper = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
    padding: 10px;

    @media (min-width: ${breakpoint}) {
        padding: ${fieldHMargin};
    }
`

const Label = styled.label`
    font-size: 1.2em;    
    color: ${lgrey};    

    @media (min-width: ${breakpoint}) {
        font-size: 1.6em;    
    }
`

const Input = styled.input`
    width: 100%;
    margin-left: 10px;
    text-indent: 10px;
    font-size: 1em;
    color: ${dgrey};    
    border-top: none;
    border-right: none;
    border-bottom: none;
    border-left: 1px solid ${lgrey};
    
    &:focus {
        outline: none;
    }

    @media (min-width: ${breakpoint}) {
        font-size: 1.6em;    
    }
`

export const InputField = props => {
    
    const handleChange = event => {
        const status = fieldStatus.beingEdited
        const isValid = props.validator(event.target.value)
        
        props.setFormValues(event.target.name, { value: event.target.value, status: status, isValid: isValid })        
    }

    const handleBlur = event => {
        const status = fieldStatus.userLeftField

        props.setFormValues(event.target.name, { value: event.target.value, status: status, isValid: props.data.isValid })        
    }

    return (
        <Wrapper>
            <Label>{props.label}</Label>
            <Input 
                name={props.name}
                value={props.data.value}
                type={props.type ? props.type : "text"}
                onChange={handleChange}
                onBlur={handleBlur}
            /> 
        </Wrapper>
    )
}