import { useState, useEffect } from 'react'
import ApiService from '../services/api'
import './Header.css'

function Header({ onSearch, onCategoryChange, user, onLoginClick, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await ApiService.getCategories()
        console.log('Categories loaded:', categoriesData)
        setCategories(categoriesData.results || categoriesData || [])
      } catch (err) {
        console.error('Error loading categories:', err)
        // Categorías de ejemplo si falla la API
        setCategories([
          { id: 1, nombre: "Tecnología", descripcion: "Posts sobre tecnología" },
          { id: 2, nombre: "Programación", descripcion: "Posts sobre programación" },
          { id: 3, nombre: "Base de Datos", descripcion: "Posts sobre bases de datos" },
          { id: 4, nombre: "Tutorial", descripcion: "Tutoriales paso a paso" },
          { id: 5, nombre: "Desarrollo Web", descripcion: "Posts sobre desarrollo web" }
        ])
      }
    }
    
    loadCategories()
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId)
    onCategoryChange(categoryId)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <h1>DB<span>Blog</span></h1>
          <span className="logo-subtitle">Database & Development</span>
        </div>

        {/* Navigation */}
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          {/* Search Bar */}
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </form>

          {/* Category Filter */}
          <div className="category-filter">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategorySelect(e.target.value)}
              className="category-select"
            >
              <option value="">Todas las categorías</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* User Actions */}
          <div className="user-actions">
            {user ? (
              <div className="user-menu">
                <span className="user-welcome">Hola, {user.email}</span>
                <button onClick={onLogout} className="logout-button">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <button onClick={onLoginClick} className="login-button">
                Iniciar Sesión
              </button>
            )}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header
