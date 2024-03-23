import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ICartElem, IProduct } from '@store/model'

interface IAuthState {}

const initialState: IAuthState = {}

export const authSlice = createSlice({
	name: 'api/auth',
	initialState,
	reducers: {}
})

export default authSlice
