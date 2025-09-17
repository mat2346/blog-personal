const API_BASE_URL = 'http://localhost:8000/api'

class ApiService {
  constructor() {
    this.token = localStorage.getItem('authToken')
  }

  setToken(token) {
    this.token = token
    if (token) {
      localStorage.setItem('authToken', token)
    } else {
      localStorage.removeItem('authToken')
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    }
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }
    
    return headers
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: this.getHeaders(),
      ...options
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || errorData.error || `HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      }
      
      return response
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Auth methods
  async login(email, password) {
    const response = await this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    
    if (response.access) {
      this.setToken(response.access)
    }
    
    return response
  }

  async register(userData) {
    const response = await this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
    
    return response
  }

  logout() {
    this.setToken(null)
  }

  // Posts methods
  async getPosts(filters = {}) {
    const queryParams = new URLSearchParams()
    
    if (filters.search) {
      queryParams.append('search', filters.search)
    }
    
    if (filters.categoria_id) {
      queryParams.append('categoria', filters.categoria_id)
    }
    
    const queryString = queryParams.toString()
    const endpoint = `/posts/${queryString ? `?${queryString}` : ''}`
    
    return await this.request(endpoint)
  }

  async getPost(id) {
    return await this.request(`/posts/${id}/`)
  }

  async createPost(postData) {
    return await this.request('/posts/', {
      method: 'POST',
      body: JSON.stringify(postData)
    })
  }

  async updatePost(id, postData) {
    return await this.request(`/posts/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(postData)
    })
  }

  async deletePost(id) {
    return await this.request(`/posts/${id}/`, {
      method: 'DELETE'
    })
  }

  async likePost(id) {
    return await this.request(`/posts/${id}/like/`, {
      method: 'POST'
    })
  }

  // Categories methods
  async getCategories() {
    return await this.request('/categorias/')
  }

  async getCategory(id) {
    return await this.request(`/categorias/${id}/`)
  }

  // Comments methods
  async getComments(postId) {
    return await this.request(`/posts/${postId}/comentarios/`)
  }

  async createComment(postId, commentData) {
    return await this.request(`/posts/${postId}/comentarios/`, {
      method: 'POST',
      body: JSON.stringify(commentData)
    })
  }

  async updateComment(postId, commentId, commentData) {
    return await this.request(`/posts/${postId}/comentarios/${commentId}/`, {
      method: 'PUT',
      body: JSON.stringify(commentData)
    })
  }

  async deleteComment(postId, commentId) {
    return await this.request(`/posts/${postId}/comentarios/${commentId}/`, {
      method: 'DELETE'
    })
  }

  // User methods
  async getCurrentUser() {
    return await this.request('/auth/user/')
  }

  async updateProfile(userData) {
    return await this.request('/auth/user/', {
      method: 'PUT',
      body: JSON.stringify(userData)
    })
  }

  // Search methods
  async search(query) {
    return await this.request(`/search/?q=${encodeURIComponent(query)}`)
  }
}

const apiService = new ApiService()
export default apiService
