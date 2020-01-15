import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Field } from './field'
import { Dropdown } from './dropdown'
import { InputField } from './input-field'
import { lgreen, dgreen, lgrey, breakpoint } from './theme'
import { isDateValid, isEmailValid, isDropDownValueValid } from './utils'

const options = [
    { value: 1, text: "One" },
    { value: 2, text: "Two" },
    { value: 3, text: "Three" },
]

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;

    @media (min-width: ${breakpoint}) {
        width: 100%;
    }
`

const FieldWrapper = styled.div`
    display: grid;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    margin-top: 20px;

    @media (min-width: ${breakpoint}) {
        margin-top: 20px;
        grid-template-columns: 480px 480px;    
    }
`

const Button = styled.button`
    width: 100%;
    max-width: 555px;
    height: 80px;
    margin: 50px 0px;
    font-size: 1.4em;
    color: white;
    background-image: linear-gradient(${props => !props.disabled ? lgreen : lgrey}, ${props => !props.disabled ? dgreen : lgrey});
    border: none;
    border-radius: 1000px;
    outline: none;

    @media (min-width: ${breakpoint}) {
        width: 50%;    
        font-size: 1.8em;
    }
`

export const Stage1 = ({ setStage, reminder, setReminder }) => {

    const [validForm, setValidForm] = useState(false)
            
    const validateForm = () => {
        setValidForm(
            reminder.category.isValid && 
            reminder.provider.isValid && 
            reminder.expiryDate.isValid && 
            reminder.email.isValid
        )
    }

    useEffect(() => { 
        validateForm()
    }, [])

    const setFormValues = (name, object) => { 
        
        setReminder({...reminder, [name]: object})
        
        validateForm()            
    }

    const goToConfirmationStage = () => {
        
        setStage(2)
    }

    // const validateForm = () => {
        
    //     let validFields = 0;
        
    //     if(reminder.category.isValid) {
    //         validFields++
    //     } else {
    //         setFormValues("category", {value: reminder.category.value, status: fieldStatus.userLeftField, isValid: false})
    //     }

    //     if(reminder.provider.isValid) {
    //         validFields++
    //     } else {
    //         setFormValues("provider", {value: reminder.provider.value, status: fieldStatus.userLeftField, isValid: false})
    //     }

    //     if(reminder.expiryDate.isValid) {
    //         validFields++
    //     } else {
    //         setFormValues("expiryDate", {value: reminder.expiryDate.value, status: fieldStatus.userLeftField, isValid: false})
    //     }

    //     if(reminder.email.isValid) {
    //         validFields++
    //     } else {
    //         setFormValues("email", {value: reminder.email.value, status: fieldStatus.userLeftField, isValid: false})
    //     }
        
    //     //setValidForm(Object.keys(values).length === validFields)
    // }

   

    return (
        <Wrapper>
            <FieldWrapper>
                <Field fieldStatus={reminder.category.status} isValid={reminder.category.isValid} errorMessage="Error: select an option">
                    <Dropdown 
                        name="category" 
                        placeholder="Kategorie wahlen" 
                        options={options} 
                        data={reminder.category} 
                        setFormValues={setFormValues}
                        validator={isDropDownValueValid}
                    />
                </Field>
                <Field fieldStatus={reminder.provider.status} isValid={reminder.provider.isValid} errorMessage="Error: select an option">
                    <Dropdown 
                        name="provider" 
                        placeholder="Arbieter wahlen" 
                        options={options} 
                        data={reminder.provider} 
                        setFormValues={setFormValues}
                        validator={isDropDownValueValid}
                    />
                </Field>
                <Field fieldStatus={reminder.expiryDate.status} isValid={reminder.expiryDate.isValid} errorMessage="Error: enter a future date">
                    <InputField 
                        name="expiryDate"
                        label="TT/MM/JJ"
                        data={reminder.expiryDate}
                        setFormValues={setFormValues}
                        validator={isDateValid}
                    />
                </Field>
                <Field fieldStatus={reminder.email.status} isValid={reminder.email.isValid} errorMessage="Error: enter a valid email">
                    <InputField 
                        name="email" 
                        label={"email"}  
                        data={reminder.email} 
                        setFormValues={setFormValues}
                        validator={isEmailValid}
                    />
                </Field>
            </FieldWrapper>
            <Button disabled={!validForm} onClick={goToConfirmationStage}>Erinnerung erstellen</Button>
        </Wrapper>
    )
}