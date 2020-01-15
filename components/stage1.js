import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import styled from '@emotion/styled'
import { Field } from './field'
import { Dropdown } from './dropdown'
import { InputField } from './input-field'
import { lgreen, dgreen, lgrey, breakpoint } from './theme'
import { isDateValid, isEmailValid, isDropDownValueValid } from './utils'
import { getCategories } from './get-categories'
import { getProviders } from './get-providers'

const Wrapper = styled.div`    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;

    @media (min-width: ${breakpoint}) {
        width: 100%;
    }
`

const FieldWrapper = styled.div`
    display: grid;    
    grid-row-gap: 30px;
    margin-top: 20px;

    @media (min-width: ${breakpoint}) {
        grid-column-gap: 30px;
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

    const [categories, setCategories] = useState([{value: -1, text: "Loading data..."}])
    const [providers, setProviders] = useState([{value: -1, text: "Loading data..."}])
    const [selectedCategory, setSelectedCategory] = useState(reminder.category.id || null)
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


    useEffect(() => {
        if(reminder.category.id != null) {
            getCategories().then(data => setCategories(data))            
        }
    }, [])


    useEffect(() => {
        if(selectedCategory != null) {
            getProviders(selectedCategory).then(data => setProviders(data))       
        }
        
    }, [selectedCategory])


    const setFormValues = (name, object) => { 
        
        setReminder({...reminder, [name]: object})
                
        validateForm()            
    }


    const goToConfirmationStage = () => {
        
        setStage(2)
    }
    
    return (
        <Wrapper>
            <FieldWrapper>
                <Field fieldStatus={reminder.category.status} isValid={reminder.category.isValid} errorMessage="Error: select an option">
                    <Dropdown 
                        name="category" 
                        placeholder="Kategorie wahlen" 
                        options={categories} 
                        data={reminder.category} 
                        setFormValues={setFormValues}
                        setSelectedCategory={setSelectedCategory}
                        validator={isDropDownValueValid}
                    />
                </Field>
                <Field fieldStatus={reminder.provider.status} isValid={reminder.provider.isValid} errorMessage="Error: select an option">
                    <Dropdown 
                        name="provider"
                        disabled={selectedCategory == null ? true : false} 
                        placeholder={selectedCategory == null ? "Select category first" : "Arbieter wahlen"} 
                        options={providers} 
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

Stage1.propTypes = {
    setReminder: PropTypes.func.isRequired,
    setStage: PropTypes.func.isRequired,
    reminder: PropTypes.object.isRequired,
}
