const API_BASE = import.meta.env.VITE_API_BASE ?? '/api';

let _token: string | null = null;

export function setToken(token: string | null) {
  _token = token;
}

function buildHeaders(custom?: Record<string, string>) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...custom
  };
  if (_token) {
    headers['Authorization'] = `Bearer ${_token}`;
  }
  return headers;
}

async function handleRes(res: Response) {
  const contentType = res.headers.get('content-type') || '';
  const text = await res.text();
  const data = contentType.includes('application/json') && text ? JSON.parse(text) : text;

  if (!res.ok) {
    // Try to surface message from response body if available
    const message =
      (data && typeof data === 'object' && (data.message || data.error)) ||
      (typeof data === 'string' && data) ||
      res.statusText;
    throw new Error(message ?? `HTTP ${res.status}`);
  }

  return data;
}

export function apiGet<T>(path: string): Promise<T> {
  return fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: buildHeaders()
  }).then(handleRes);
}

export function apiPost<T>(path: string, body?: any): Promise<T> {
  return fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: buildHeaders(),
    body: body ? JSON.stringify(body) : undefined
  }).then(handleRes);
}

export function apiPut<T>(path: string, body?: any): Promise<T> {
  return fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: buildHeaders(),
    body: body ? JSON.stringify(body) : undefined
  }).then(handleRes);
}

export function apiDelete<T>(path: string): Promise<T> {
  return fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    headers: buildHeaders()
  }).then(handleRes);
}