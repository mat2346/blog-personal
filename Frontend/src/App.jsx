import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import BlogCard from './components/BlogCard'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'
import ApiService from './services/api'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    categoria_id: ''
  })

  useEffect(() => {
    const loadPostsEffect = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await ApiService.getPosts(filters)
        console.log('Posts response:', response)
        setPosts(response.results || response || [])
      } catch (err) {
        console.error('Error loading posts:', err)
        setError('No se pudieron cargar los posts del servidor. Mostrando datos de ejemplo.')
        // Mostrar datos de ejemplo si falla la API
        setPosts([
          {
            id: 1,
            titulo: "Introducción a Bases de Datos SQL",
            contenido: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            fecha_creacion: "2025-01-19T10:30:00Z",
            categoria: [{ id: 1, nombre: "Tecnología", descripcion: "Posts sobre tecnología" }],
            likes_count: 5,
            comentarios_count: 3
          },
          {
            id: 2,
            titulo: "NoSQL vs SQL: ¿Cuál elegir?",
            contenido: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type.",
            fecha_creacion: "2025-01-18T14:15:00Z",
            categoria: [{ id: 1, nombre: "Tecnología", descripcion: "Posts sobre tecnología" }],
            likes_count: 8,
            comentarios_count: 5
          },
          {
            id: 3,
            titulo: "Optimización de Consultas en MySQL",
            contenido: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type.",
            fecha_creacion: "2025-01-17T09:45:00Z",
            categoria: [{ id: 2, nombre: "Programación", descripcion: "Posts sobre programación" }],
            likes_count: 12,
            comentarios_count: 7
          },
          {
            id: 4,
            titulo: "MongoDB: Guía para Principiantes",
            contenido: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type.",
            fecha_creacion: "2025-01-16T16:20:00Z",
            categoria: [{ id: 1, nombre: "Tecnología", descripcion: "Posts sobre tecnología" }],
            likes_count: 3,
            comentarios_count: 2
          },
          {
            id: 5,
            titulo: "PostgreSQL: Características Avanzadas",
            contenido: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type.",
            fecha_creacion: "2025-01-15T11:10:00Z",
            categoria: [{ id: 3, nombre: "Base de Datos", descripcion: "Posts sobre bases de datos" }],
            likes_count: 7,
            comentarios_count: 4
          },
          {
            id: 6,
            titulo: "Redis: Cache y Almacenamiento en Memoria",
            contenido: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type.",
            fecha_creacion: "2025-01-14T13:30:00Z",
            categoria: [{ id: 1, nombre: "Tecnología", descripcion: "Posts sobre tecnología" }],
            likes_count: 15,
            comentarios_count: 9
          }
        ])
      } finally {
        setLoading(false)
      }
    }
    
    loadPostsEffect()
  }, [filters])

  // Verificar si hay token guardado al cargar la app
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      ApiService.setToken(token)
      setUser({ email: 'usuario@ejemplo.com' })
    }
  }, [])

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm
    }))
  }

  const handleCategoryChange = (categoryId) => {
    setFilters(prev => ({
      ...prev,
      categoria_id: categoryId
    }))
  }

  const handleLike = async (postId) => {
    if (!user) {
      setShowLoginModal(true)
      return
    }

    try {
      await ApiService.likePost(postId)
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, likes_count: (post.likes_count || 0) + 1 }
            : post
        )
      )
    } catch (err) {
      console.error('Error al dar like:', err)
    }
  }

  const handleLogin = (userData) => {
    setUser(userData)
    setShowLoginModal(false)
  }

  const handleLogout = () => {
    ApiService.logout()
    setUser(null)
  }

  return (
    <div className="app">
      <Header 
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />
      
      <HeroSection />
      
      <main className="main-content">
        {loading && (
          <div className="loading">
            <p>Cargando posts...</p>
          </div>
        )}
        
        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}
        
        <div className="blog-grid">
          {posts.map(post => (
            <BlogCard 
              key={post.id} 
              post={post} 
              onLike={handleLike}
            />
          ))}
        </div>
        
        {!loading && posts.length === 0 && (
          <div className="no-posts">
            <p>No se encontraron posts.</p>
          </div>
        )}
      </main>
      
      <Footer />
      
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </div>
  )
}

export default App
