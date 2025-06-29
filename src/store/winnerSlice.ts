import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Winner {
	id: number
	wins: number
	time: number
}

interface WinnersState {
	winners: Winner[]
	totalCount: number
	page: number
}

const initialState: WinnersState = {
	winners: [],
	totalCount: 0,
	page: 1,
}

export const winnersSlice = createSlice({
	name: 'winners',
	initialState,
	reducers: {
		setWinners: (
			state,
			action: PayloadAction<{ winners: Winner[]; totalCount: number }>
		) => {
			state.winners = action.payload.winners
			state.totalCount = action.payload.totalCount
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload
		},
	},
})

export const { setWinners, setPage } = winnersSlice.actions

export default winnersSlice.reducer
