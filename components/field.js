import React, { useState } from 'react'
import styled from '@emotion/styled'
import { breakpoint, borderRadius, lgrey, errorColor, fieldHMargin } from './theme'
import { fieldStatus } from './utils'

const images = ["edit", "wrong", "check"]

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    height: 80px;
    border-radius: ${borderRadius};
    box-shadow: 0px 10px 20px ${lgrey};

    @media (min-width: ${breakpoint}) {
        height: 100px;
    }
`

const ErrorWrapper = styled.div`
    position: absolute;
    left: 0;
    bottom: 10px;
    margin-left: 10px;

    @media (min-width: ${breakpoint}) {
        margin-left: ${fieldHMargin};
    }
`

const ImageWrapper = styled.div`
    width: 16px;
    height: 16px;
    position: absolute;
    right: 16px;
    bottom: 16px;    
`

const Span = styled.span`
    color: ${errorColor};
`

export const Field = props => {

    let imageNumber = -1
    
    if(props.fieldStatus === fieldStatus.beingEdited) {
        imageNumber = 0
    } else if (props.fieldStatus === fieldStatus.userLeftField && !props.isValid) {
        imageNumber = 1
    } else if (props.fieldStatus === fieldStatus.userLeftField && props.isValid) {
        imageNumber = 2
    } 

    return (
        <Wrapper>
            {props.children}
            {(props.fieldStatus === fieldStatus.userLeftField && !props.isValid) && 
                <ErrorWrapper>
                    <Span>{props.errorMessage}</Span>
                </ErrorWrapper>
            }
            {imageNumber > -1 &&
                <ImageWrapper>
                    <img src={`components/images/${images[imageNumber]}.png`} />        
                </ImageWrapper>
            }
        </Wrapper>
    )
}