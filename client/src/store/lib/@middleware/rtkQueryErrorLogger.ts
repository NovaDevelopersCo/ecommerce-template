import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit'

// import { toast } from 'your-cool-library'

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => next => action => {
		// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
		if (isRejectedWithValue(action)) {
			console.warn('We got a rejected action!')
			// toast.warn({
			// 	title: 'Async error!',
			// 	message:
			// 		'data' in action.error
			// 			? (action.error.data as { message: string }).message
			// 			: action.error.message
			// })
		}

		return next(action)
	}
