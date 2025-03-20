import { createSlice } from '@reduxjs/toolkit';
import {
	registerUserRequest,
	loginRequest,
	forgotPasswordRequest,
	resetPasswordRequest,
	logoutRequest,
} from '../../utils/api-data';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	isLoading: false,
	isFailed: false,
	error: '',
};

const createAsyncAction = (actionName, apiRequest) => {
	return createAsyncThunk(
		`user/${actionName}`,
		async (data, { rejectWithValue }) => {
			try {
				const response = await apiRequest(data);
				return response;
			} catch (error) {
				return rejectWithValue(error.message);
			}
		}
	);
};

export const registerUser = createAsyncAction(
	'registerUser',
	registerUserRequest
);

export const login = createAsyncAction('login', loginRequest);

export const forgotPassword = createAsyncAction(
	'forgotPassword',
	forgotPasswordRequest
);

export const resetPassword = createAsyncAction(
	'resetPassword',
	resetPasswordRequest
);

export const logout = createAsyncAction(
	'logout',
	logoutRequest
);

/*export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (data, { rejectWithValue }) => {
		try {
			const response = await registerUserRequest(data);
			return response;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const login = createAsyncThunk(
	'user/login',
	async (data, { rejectWithValue }) => {
		try {
			const response = await loginRequest(data);
			return response;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const forgotPassword = createAsyncThunk(
	'user/forgotPassword',
	async (data, { rejectWithValue }) => {
		try {
			const response = await forgotPasswordRequest(data);
			return response;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const resetPassword = createAsyncThunk(
	'user/resetPassword',
	async (data, { rejectWithValue }) => {
		try {
			const response = await resetPasswordRequest(data);
			return response;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);*/

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
