import { Car } from '@/types/car.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Winner {
	id: number
	name: string
	time: number
}

interface WinnerRecord {
	id: number
	carId: number
	name: string
	color: string
	wins: number
	bestTime: number
}

interface GarageState {
	cars: Car[]
	running: Record<number, boolean>
	positions: Record<number, 0 | 1>
	shouldStartRace: boolean
	winner: Winner | null
	// Garage pagination state
	garagePage: number
	garageTotalCount: number
}

interface WinnersState {
	winners: WinnerRecord[]
	winnersPage: number
	winnersTotalCount: number
	winnersPerPage: number
}

interface AppState {
	currentView: 'garage' | 'winners'
}

const initialGarageState: GarageState = {
	cars: [],
	running: {},
	positions: {},
	shouldStartRace: false,
	winner: null,
	garagePage: 1,
	garageTotalCount: 0,
}

const initialWinnersState: WinnersState = {
	winners: [],
	winnersPage: 1,
	winnersTotalCount: 0,
	winnersPerPage: 10,
}

const initialAppState: AppState = {
	currentView: 'garage',
}

// Garage Slice
export const garageSlice = createSlice({
	name: 'garage',
	initialState: initialGarageState,
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
		setGaragePage: (state, action: PayloadAction<number>) => {
			state.garagePage = action.payload
		},
		setGarageTotalCount: (state, action: PayloadAction<number>) => {
			state.garageTotalCount = action.payload
		},
	},
})

// Winners Slice
export const winnersSlice = createSlice({
	name: 'winners',
	initialState: initialWinnersState,
	reducers: {
		setWinners: (state, action: PayloadAction<WinnerRecord[]>) => {
			state.winners = action.payload
		},
		addWinner: (state, action: PayloadAction<Omit<WinnerRecord, 'id'>>) => {
			const existingWinner = state.winners.find(
				w => w.carId === action.payload.carId
			)

			if (existingWinner) {
				existingWinner.wins += 1
				if (action.payload.bestTime < existingWinner.bestTime) {
					existingWinner.bestTime = action.payload.bestTime
				}
			} else {
				const newWinner: WinnerRecord = {
					...action.payload,
					id: Date.now(), // Simple ID generation
					wins: 1,
				}
				state.winners.push(newWinner)
				state.winnersTotalCount += 1
			}
		},
		setWinnersPage: (state, action: PayloadAction<number>) => {
			state.winnersPage = action.payload
		},
		setWinnersTotalCount: (state, action: PayloadAction<number>) => {
			state.winnersTotalCount = action.payload
		},
		deleteWinner: (state, action: PayloadAction<number>) => {
			state.winners = state.winners.filter(w => w.carId !== action.payload)
			state.winnersTotalCount = Math.max(0, state.winnersTotalCount - 1)
		},
	},
})

// App Navigation Slice
export const appSlice = createSlice({
	name: 'app',
	initialState: initialAppState,
	reducers: {
		setCurrentView: (state, action: PayloadAction<'garage' | 'winners'>) => {
			state.currentView = action.payload
		},
	},
})

// Export actions (updated for your winnersSlice)
export const {
	setCars,
	setRunning,
	setPosition,
	startRace,
	resetRace,
	setWinner,
	setGaragePage,
	setGarageTotalCount,
} = garageSlice.actions

export const { setWinners } = winnersSlice.actions

export const { setCurrentView } = appSlice.actions

// Export reducers
export const garageReducer = garageSlice.reducer
export const winnersReducer = winnersSlice.reducer
export const appReducer = appSlice.reducer
