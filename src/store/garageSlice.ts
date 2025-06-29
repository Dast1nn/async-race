import { Car } from '@/types/car.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Winner {
	id: number
	name: string
	time: number
}

interface GarageState {
	cars: Car[]
	running: Record<number, boolean>
	positions: Record<number, 0 | 1>
	shouldStartRace: boolean
	winner: Winner | null
}

const initialState: GarageState = {
	cars: [],
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

			// Reset all running + positions when race starts
			for (const id in state.positions) {
				state.positions[Number(id)] = 0
			}
			for (const id in state.running) {
				state.running[Number(id)] = false
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
	setRunning,
	setPosition,
	startRace,
	resetRace,
	setWinner,
} = garageSlice.actions

export default garageSlice.reducer
