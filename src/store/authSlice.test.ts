import { describe, it, expect } from 'vitest'
import authReducer, { loginUser, registerUser } from './authSlice'
import type { User } from './authSlice'

describe('auth slice', () => {
  const initialState = {
    loggedIn: false,
    token: null,
    user: null,
    status: 'idle',
    error: null,
    initialized: false,
  }

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type }
    const state = authReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      status: 'loading',
      error: null,
    })
  })

  it('should handle loginUser.fulfilled', () => {
    const mockUser: User = { _id: '1', email: 'test@example.com' }
    const mockToken = 'mock-token'
    const action = { 
      type: loginUser.fulfilled.type, 
      payload: { user: mockUser, token: mockToken } 
    }
    const state = authReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      user: mockUser,
      token: mockToken,
      loggedIn: true,
      status: 'succeeded',
      initialized: true,
      error: null,
    })
  })

  it('should handle loginUser.rejected', () => {
    const errorMessage = 'Login failed'
    const action = { 
      type: loginUser.rejected.type, 
      payload: errorMessage
    }
    const state = authReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      status: 'failed',
      error: errorMessage,
      initialized: true,
    })
  })

  it('should handle registerUser.pending', () => {
    const action = { type: registerUser.pending.type }
    const state = authReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      status: 'loading',
      error: null,
    })
  })

  it('should handle registerUser.fulfilled', () => {
    const mockUser: User = { _id: '1', email: 'test@example.com', name: 'Test User' }
    const mockToken = 'mock-token'
    const action = { 
      type: registerUser.fulfilled.type, 
      payload: { user: mockUser, token: mockToken } 
    }
    const state = authReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      status: 'succeeded',
      loggedIn: false, // Note: register doesn't automatically log in
      initialized: true,
      error: null,
    })
  })

  it('should handle registerUser.rejected', () => {
    const errorMessage = 'Registration failed'
    const action = { 
      type: registerUser.rejected.type, 
      payload: errorMessage
    }
    const state = authReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      status: 'failed',
      error: errorMessage,
      initialized: true,
    })
  })

  // Test the logout reducer
  it('should handle logout action', () => {
    const loggedInState = {
      loggedIn: true,
      token: 'some-token',
      user: { _id: '1', email: 'test@example.com' } as User,
      status: 'succeeded',
      error: null,
      initialized: true,
    }
    
    const action = { type: 'auth/logout' }
    const state = authReducer(loggedInState, action)
    
    expect(state).toEqual({
      loggedIn: false,
      token: null,
      user: null,
      status: 'idle',
      error: null,
      initialized: true,
    })
  })

  // Test the setUser reducer
  it('should handle setUser action', () => {
    const mockUser: User = { _id: '1', email: 'test@example.com', name: 'Test User' }
    const action = { 
      type: 'auth/setUser',
      payload: mockUser
    }
    const state = authReducer(initialState, action)
    
    expect(state).toEqual({
      ...initialState,
      user: mockUser,
      loggedIn: true,
      initialized: true,
    })
  })

  // Test the markInitialized reducer
  it('should handle markInitialized action', () => {
    const action = { type: 'auth/markInitialized' }
    const state = authReducer(initialState, action)
    
    expect(state).toEqual({
      ...initialState,
      initialized: true,
    })
  })
})