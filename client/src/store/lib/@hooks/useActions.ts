import { useMemo } from 'react'

import { bindActionCreators } from 'redux'

import useAppDispatch from './useAppDispatch'

// You need to spread all action creators to this object
const rootActions = {}

/**
 * Hook to bind all actions-creators to dispatch automatically
 * (needed with usage redux-thunk and etc. fetching libs)
 */
export const useActions = () => {
	const dispatch = useAppDispatch()
	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}

export default useActions
