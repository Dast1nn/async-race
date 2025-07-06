import { Car } from '@/types/car.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Winner {
	id: number
	name: string
	time: number
}

export interface GarageState {
	cars: Car[]
	page: number
	totalCount: number
	running: Record<number, boolean> // carId => isRunning
	positions: Record<number, 0 | 1> // carId => 0 | 1
	shouldStartRace: boolean
	winner: Winner | null
}

const initialState: GarageState = {
	cars: [],
	page: 1,
	totalCount: 0,
	running: {},
	positions: {},
	shouldStartRace: false,
	winner: null,
}

export const garageSlice = createSlice({
	name: 'garage',
	initialState,
	reducers: {
		setCars: (state, action: PayloadAction<Car[]>) => {
			state.cars = action.payload
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload
		},
		setTotalCount: (state, action: PayloadAction<number>) => {
			state.totalCount = action.payload
		},
		setRunning: (
			state,
			action: PayloadAction<{ id: number; running: boolean }>
		) => {
			state.running[action.payload.id] = action.payload.running
		},
		setPosition: (
			state,
			action: PayloadAction<{ id: number; position: 0 | 1 }>
		) => {
			state.positions[action.payload.id] = action.payload.position
		},
		startRace: state => {
			state.shouldStartRace = true
			state.winner = null

			// ✅ Reset ALL positions to 0
			for (const id of Object.keys(state.positions)) {
				state.positions[+id] = 0
			}

			// ✅ Reset ALL running flags to false
			for (const id of Object.keys(state.running)) {
				state.running[+id] = false
			}
		},
		resetRace: state => {
			state.running = {}
			state.positions = {}
			state.shouldStartRace = false
			state.winner = null
		},
		setWinner: (state, action: PayloadAction<Winner | null>) => {
			state.winner = action.payload
			state.shouldStartRace = false
		},
	},
})

export const {
	setCars,
	setPage,
	setTotalCount,
	setRunning,
	setPosition,
	startRace,
	resetRace,
	setWinner,
} = garageSlice.actions

export default garageSlice.reducer
