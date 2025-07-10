import { usersReducer } from './user';
import {
  initialState,
  login,
  logout,
  registerUser,
  getUser,
  checkUserAuth
} from './user';
import { User } from './user';

const user: User = {
  email: 'iamsabina13@gmail.com',
  name: '123',
};

describe('usersReducer', () => {
  it('should return the initial state', () => {
    const state = usersReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  describe('login', () => {
    it('should set user and authChecked to true when fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
        payload: { user },
      };
      const state = usersReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        user,
        isAuthChecked: true,
        isLoading: false,
      });
    });

    it('should handle rejection', () => {
      const action = {
        type: login.rejected.type,
        error: { message: 'Ошибка авторизации' },
      };
      const state = usersReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.isFailed).toBe(true);
      expect(state.error).toBe('Ошибка авторизации');
    });
  });

  describe('logout', () => {
    it('should clear user when fulfilled', () => {
      const action = { type: logout.fulfilled.type };
      const state = usersReducer({ ...initialState, user }, action);
      expect(state.user).toBe(null);
    });
  });

  describe('registerUser', () => {
    it('should set user when fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: { user },
      };
      const state = usersReducer(initialState, action);
      expect(state.user).toEqual(user);
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('getUser', () => {
    it('should set user when fulfilled', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: { success: true, user },
      };
      const state = usersReducer(initialState, action);
      expect(state.user).toEqual(user);
      expect(state.isAuthChecked).toBe(true);
    });

    it('should handle rejected getUser', () => {
      const action = {
        type: getUser.rejected.type,
        error: { message: 'Ошибка получения пользователя' },
      };
      const state = usersReducer(initialState, action);
      expect(state.error).toBe('Ошибка получения пользователя');
      expect(state.isFailed).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('checkUserAuth', () => {
    it('should set isAuthChecked when fulfilled', () => {
      const action = { type: checkUserAuth.fulfilled.type };
      const state = usersReducer(initialState, action);
      expect(state.isAuthChecked).toBe(true);
    });

    it('should set isAuthChecked when rejected', () => {
      const action = { type: checkUserAuth.rejected.type };
      const state = usersReducer(initialState, action);
      expect(state.isAuthChecked).toBe(true);
    });
  });
});