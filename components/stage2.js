import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Field } from './field'
import { InputField } from './input-field'
import { initializeReminder } from './utils'
import { breakpoint, lgreen, dgreen, lgrey } from './theme'

export const Stage2 = ({ setStage, reminder, setReminder }) => {

    const Wrapper = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;een;
    `

    const GridWrapper = styled.div`
        display: grid;
        width: 90%;            
        grid-row-gap: 30px;

        @media (min-width: ${breakpoint}) {
            width: 100%;            
            grid-template-columns: 500px;    
        }
    `

    const ButtonWrapper = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        
        @media (min-width: ${breakpoint}) {
            width: 100%;
            flex-grow: 1;
            flex-direction: row;    
            justify-content: space-between;
        }
    `
    const Button = styled.button`
        order: ${props => props.primary ? 1 : 2};
        width: 100%;
        height: 60px;
        margin-top: 20px;
        font-size: 1.4em;
        color: ${props => props.primary ? "white" : lgreen};
        background-image: linear-gradient(${props => props.primary ? lgreen : "white"}, ${props => props.primary ? dgreen : "white"});
        border: 2px solid ${lgreen};
        border-radius: 1000px;
        outline: none;

        @media (min-width: ${breakpoint}) {
            order: ${props => props.primary ? 2 : 1};
            width: 220px;
            height: 80px;
            margin-top: 50px;
            font-size: 1.8em;
        }
    `

    const submitReminder = () => {
        // TODO: send reminder data to backend
        // saveReminder()
        
        setReminder(initializeReminder())

        setStage(3)
    }

    return (
        <Wrapper>
            <GridWrapper>
                <Field>
                    <InputField
                        label="Category"
                        data={reminder.category}
                    />
                </Field>
                <Field>
                    <InputField
                        label="Provider"
                        data={reminder.provider}
                    />
                </Field>
                <Field>
                    <InputField
                        label="Expiry Date"
                        data={reminder.expiryDate}
                    />
                </Field>
                <Field>
                    <InputField
                        label="email"
                        data={reminder.email}
                    />
                </Field>                
            </GridWrapper>
            <ButtonWrapper>
                <Button primary={false} onClick={() => setStage(1)}>Back</Button>
                <Button primary={true} onClick={submitReminder}>Set Reminder</Button>
            </ButtonWrapper>
        </Wrapper>
    )
}