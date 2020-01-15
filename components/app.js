import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Title } from './title'
import { Stage1 } from './stage1'
import { Stage2 } from './stage2'
import { Stage3 } from './stage3'
import { initializeReminder } from './utils'
import { breakpoint } from './theme'

const PageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	max-width: 90%;
    margin: auto;
    
    @media (min-width: ${breakpoint}) {
        max-width: 1200px;
    }
`

export const App = () => {

	const [stage, setStage] = useState(1)
	const [reminder, setReminder] = useState(initializeReminder())

	return (
		<PageWrapper>
				<Title />
				{ (stage === 1) && <Stage1 setStage={setStage} reminder={reminder} setReminder={setReminder} /> }
				{ (stage === 2) && <Stage2 setStage={setStage}  reminder={reminder} setReminder={setReminder} /> }
				{(stage === 3) && <Stage3 setStage={setStage} /> }
		</PageWrapper>
	)
}
