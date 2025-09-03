import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/api/auth/login', () => {
    return HttpResponse.json({
      user: { id: 1, email: 'test@example.com' },
      token: 'mock-jwt-token',
    })
  }),
  http.post('/api/auth/register', () => {
    return HttpResponse.json({
      user: { id: 1, email: 'test@example.com', name: 'Test User' },
      token: 'mock-jwt-token',
    })
  }),
]