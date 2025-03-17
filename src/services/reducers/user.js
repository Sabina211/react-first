import { createSlice } from '@reduxjs/toolkit';
import { registerUserRequest } from '../../utils/api-data';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	isLoading: false,
	isFailed: false,
	error: '',
};

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (_, { rejectWithValue }) => {
		try {
			const response = await registerUserRequest();
			return response;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
				state.isFailed = false;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isFailed = true;
				state.error = action.error?.message;
			});
	},
});

export const usersReducer = userSlice.reducer;
