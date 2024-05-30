export const state = () => ({
  token: null,
  username: null,
  isAuthenticated: false,
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  },
  setUsername(state, username) {
    state.username = username
  },
  clearUsername(state) {
    state.username = null
  },
  setAuthenticated(state, status) {
    state.isAuthenticated = status
  },
}

export const actions = {
  initializeAuth({ commit }) {
    if (process.client) {
      const auth = JSON.parse(localStorage.getItem('auth'))
      if (auth && auth.token && auth.username) {
        commit('setToken', auth.token)
        commit('setUsername', auth.username)
        commit('setAuthenticated', true)
      }
    }
  },
  async login({ commit }, { username, password }) {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
      })
      const data = await response.json()
      if (data.token) {
        const authData = {
          token: data.token,
          username: username
        }
        commit('setToken', data.token)
        commit('setUsername', username)
        commit('setAuthenticated', true)
        if (process.client) {
          localStorage.setItem('auth', JSON.stringify(authData))
        }
      } else {
        throw new Error('Authentication failed')
      }
    } catch (error) {
      throw error
    }
  },
  logout({ commit }) {
    commit('clearToken')
    commit('clearUsername')
    commit('setAuthenticated', false)
    if (process.client) {
      localStorage.removeItem('auth')
    }
  },
}
