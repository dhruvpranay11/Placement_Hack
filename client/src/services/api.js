import { supabase } from '../lib/supabase'

const API_BASE = '/api'

async function getAuthHeaders() {
  const headers = {
    'Content-Type': 'application/json',
  }
  
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.access_token) {
      headers.Authorization = `Bearer ${session.access_token}`
    }
  } catch {
    // Session retrieval error fallback
  }

  // Also support demo/mock user token stored in localStorage for offline testing
  const mockToken = localStorage.getItem('placeready_mock_token')
  if (!headers.Authorization && mockToken) {
    headers.Authorization = `Bearer ${mockToken}`
  }

  return headers
}

async function request(endpoint, options = {}) {
  const headers = await getAuthHeaders()
  
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  })

  let result = {}
  try {
    result = await response.json()
  } catch {
    result = { error: 'Invalid response from server' }
  }

  if (!response.ok) {
    throw new Error(result.error || `Request failed with status ${response.status}`)
  }

  return result
}

export const api = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),
  post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  patch: (endpoint, body) => request(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
}

