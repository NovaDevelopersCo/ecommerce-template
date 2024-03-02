import { Action, Reducer } from 'redux'

const round = (number: number) => Math.round(number * 100) / 100

const monitorReducerEnhancer =
	(createStore: () => void) => (reducer: Reducer, initialState, enhancer) => {
		const monitoredReducer = (state, action: Action) => {
			const start = performance.now()
			const newState = reducer(state, action)
			const end = performance.now()
			const diff = round(end - start)

			console.log('reducer process time:', diff)

			return newState
		}

		return createStore(monitoredReducer, initialState, enhancer)
	}

export default monitorReducerEnhancer
