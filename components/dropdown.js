import React, { useState } from 'react'
import styled from '@emotion/styled'
import { breakpoint, lgrey, dgrey, fieldHMargin } from './theme'
import { fieldStatus } from './utils'

const Select = styled.select`
    border: none;
    width: 100%;
    font-size: 1.2em;
    margin: 0 10px;
    color: ${props => props.isValid ? dgrey : lgrey}; 
    background-color: white;
    outline: none;  

    @media (min-width: ${breakpoint}) {
        font-size: 1.6em;    
        margin: 0 ${fieldHMargin};
    }
`

export const Dropdown = props => {
    
    const options = Array.from(props.options)
    
    if(props.placeholder) {
        options.unshift({ value: -1, text: props.placeholder })
    }

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
        <Select 
            name={props.name} 
            value={props.data.value} 
            isValid={props.data.isValid}
            onChange={handleChange}
            onBlur={handleBlur}
        >
            {options.map((item, i) => <option key={i} value={item.value}>{item.text}</option> )}
        </Select>
    )
}


// Proptypes
// placeholder is not required