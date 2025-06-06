import {
	createSlice,
	createAsyncThunk,
	isPending,
	isRejected,
} from '@reduxjs/toolkit';
import {
	registerUserRequest,
	loginRequest,
	forgotPasswordRequest,
	resetPasswordRequest,
	logoutRequest,
	getUserRequest,
	postUserRequest,
	UserResponse,
} from '../../utils/api-data';

export interface User {
	email: string | null;
	name: string | null;
}

interface UserState {
	user: User | null;
	isLoading: boolean;
	isFailed: boolean;
	error: string;
	isAuthChecked: boolean;
}

interface AuthResponse {
	user: User;
}

const initialState: UserState = {
	user: null,
	isLoading: false,
	isFailed: false,
	error: '',
	isAuthChecked: false,
};

export interface ForgotPasswordForm {
	email: string;
}

export interface ResetPassword {
	password: string;
	token: string;
}

export interface Register {
	password: string;
	email: string;
	name: string;
}

export interface UserData {
	password: string;
	email: string;
	name: string;
}

export interface Login {
	password: string;
	email: string;
}

const createAsyncAction = <TResponse, TRequest = void>(
	actionName: string,
	apiRequest: (data: TRequest) => Promise<TResponse>
) => {
	return createAsyncThunk<TResponse, TRequest>(
		`user/${actionName}`,
		async (data, { rejectWithValue }) => {
			try {
				const response = await apiRequest(data as TRequest);
				return response;
			} catch (error: any) {
				return rejectWithValue(error.message);
			}
		}
	);
};

export const registerUser = createAsyncAction<UserResponse, Register>(
	'registerUser',
	registerUserRequest
);

export const login = createAsyncAction<UserResponse, Login>(
	'login',
	loginRequest
);


export const forgotPassword = createAsyncAction<any, ForgotPasswordForm>(
	'forgotPassword',
	forgotPasswordRequest
);

export const resetPassword = createAsyncAction<any, ResetPassword>(
	'resetPassword',
	resetPasswordRequest
);

export const logout = createAsyncThunk(
	'user/logout',
	async (_, { rejectWithValue }) => {
		try {
			const response = await logoutRequest();
			return response;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

type GetUserResponse = { success: boolean; user: User };

export const getUser = createAsyncThunk<GetUserResponse, void,	{ rejectValue: string }>('user/getUser', async (_, thunkAPI) => {
	try {
		const response = await getUserRequest();
		return response;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const checkUserAuth = createAsyncThunk('profile/checkUserAuth', async (_, thunkAPI) => {
	const accessToken = localStorage.getItem('accessToken');
	if (accessToken) {
		try {
			await thunkAPI.dispatch(getUser()).unwrap();
		} catch {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
		}
	}
	return;
});

export const postUser = createAsyncAction('postUser', postUserRequest);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.isAuthChecked = true;
				console.log('Регистарция пользователя прошло успешно');
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.isAuthChecked = true;
				console.log('Авторизация пользователя прошла успешно');
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = initialState.user;
				console.log('Разлогирование пользователя прошло успешно');
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.isAuthChecked = true;
				console.log('ПОлучение пользователя прошло успешно');
			})
			.addCase(postUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				console.log('Изменение пользователя прошло успешно');
			})
			.addCase(forgotPassword.fulfilled, (state) => {
				state.isLoading = false;
				console.log('Запрос resetPassword прошел успешно');
			})
			.addCase(resetPassword.fulfilled, (state) => {
				state.isLoading = false;
				console.log('Запрос resetPassword прошел успешно');
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isAuthChecked = true;
				state.isFailed = true;
				state.error = action.error?.message || 'Что-то пошло не так';
			})
			.addCase(getUser.rejected, (state, action) => {
				state.isAuthChecked = true;
				state.isLoading = false;
				state.isFailed = true;
				state.user = null;
				state.error = action.error?.message || 'Что-то пошло не так';
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
			})
			.addCase(checkUserAuth.fulfilled, (state) => {
				state.isAuthChecked = true;
			})
			.addCase(checkUserAuth.rejected, (state) => {
				state.isAuthChecked = true;
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
			});
	},
});

export const usersReducer = userSlice.reducer;
