import { Action, Dispatch } from 'redux'

import { AppStore } from '@store/index'

const logger = (store: AppStore) => (next: Dispatch) => (action: Action) => {
	console.group(action.type)
	console.info('dispatching', action)
	const result = next(action)
	console.log('next state', store.getState())
	console.groupEnd()
	return result
}

export default logger
