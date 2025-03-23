import { createSlice, createAsyncThunk, isPending, isRejected } from '@reduxjs/toolkit';
import {
	registerUserRequest,
	loginRequest,
	forgotPasswordRequest,
	resetPasswordRequest,
	logoutRequest,
	getUserRequest,
	postUserRequest
} from '../../utils/api-data';

const initialState = {
	user: {
        email: null,
        name: null,
    },
	isAuth: false,
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

export const logout = createAsyncThunk(
	'user/logout',
	async (_, { rejectWithValue }) => {
		try {
			const response = await logoutRequest();
			return response;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const getUser = createAsyncThunk(
	'user/getUser',
	async (_, { rejectWithValue }) => {
		try {
			const response = await getUserRequest();
			return response;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const postUser = createAsyncAction(
	'postUser',
	postUserRequest
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				console.log("Регистарция пользователя прошло успешно");
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.isAuth = true;
				console.log("Авторизация пользователя прошла успешно");
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = initialState.user;
				state.isAuth = false;
				console.log("Разлогирование пользователя прошло успешно");
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.isAuth = true;
				console.log("ПОлучение пользователя прошло успешно");
			})
			.addCase(postUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				console.log("Изменение пользователя прошло успешно");
			})
			.addMatcher(isPending, (state) => {
				state.isLoading = true;
				state.isFailed = false;
				state.error = '';
			})
			.addMatcher(isRejected, (state, action) => {
				state.isLoading = false;
				state.isFailed = true;
				state.error = action.error?.message || 'Что-то пошло не так';
			});;
	},
});

export const usersReducer = userSlice.reducer;
