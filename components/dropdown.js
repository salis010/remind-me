import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
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
        
        const selectedIndex = event.target.options.selectedIndex
        const text = event.target.options[selectedIndex].getAttribute("text")
        
        if(event.target.name === "category") {
            props.setSelectedCategory(event.target.value)
        }
        
        props.setFormValues(event.target.name, { id: event.target.value, value: text, status: status, isValid: isValid })
    }

    const handleBlur = event => {
        const status = fieldStatus.userLeftField

        const selectedIndex = event.target.options.selectedIndex
        const text = event.target.options[selectedIndex].getAttribute("text")
        
        props.setFormValues(event.target.name, { id: event.target.value, value: text, status: status, isValid: props.data.isValid })        
    }

    return (
        <Select 
            name={props.name} 
            value={props.data.id} 
            isValid={props.data.isValid}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={props.disabled}
        >
            {options.map((item, i) => <option key={i} value={item.value} text={item.text}>{item.text}</option> )}
        </Select>
    )
}

Dropdown.propTypes = {
    data: PropTypes.shape({
        isValid: PropTypes.bool.isRequired,
    }),
    disabled: PropTypes.bool,
    item: PropTypes.shape({
        value: PropTypes.string.isRequired,
    }),
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    setFormValues: PropTypes.func.isRequired,
    setSelectedCategory: PropTypes.func,
    validator: PropTypes.func.isRequired,
}
