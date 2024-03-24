import { useMemo } from 'react'

import { bindActionCreators } from 'redux'

import { authSlice, cartSlice, productsSlice } from '../@slices'
import useAppDispatch from './useAppDispatch'

// You need to spread all action creators to this object
const rootActions = {
	...authSlice.actions,
	...cartSlice.actions,
	...productsSlice.actions
}
/** Dynamic variant without typescript */
/*
import * as RootSlices from '../@slices'
const mergeActions = ({...slices}) => {
 	return slices.reduce((acc: object, slice: Slice) => {
 		// Извлекаем все экшены из слайса и объединяем их с предыдущими
 		Object.assign(acc, slice.actions)
 		return acc
 	}, {})
 }

 // Объединяем экшены из всех слайсов в один объект
 const rootActions = mergeActions(RootSlices)
*/

/**
 * Hook to bind all actions-creators to dispatch automatically
 * (needed with usage redux-thunk and etc. fetching libs)
 */
export const useActions = () => {
	const dispatch = useAppDispatch()
	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}

export default useActions
