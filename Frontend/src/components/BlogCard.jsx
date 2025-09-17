import { useState } from 'react'
import './BlogCard.css'

function BlogCard({ post, onLike }) {
  const [liked, setLiked] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    onLike(post.id)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const renderStars = (count = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < count ? 'filled' : ''}`}>
        ★
      </span>
    ))
  }

  return (
    <article className="blog-card">
      <div className="card-header">
        <div className="phone-mockup">
          <div className="phone-screen">
            <div className="phone-content">
              <div className="phone-header">
                <span className="phone-time">9:41</span>
                <span className="phone-battery">🔋</span>
              </div>
              <div className="phone-app">
                <div className="app-icon">📱</div>
                <span className="app-name">DB App</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-category">
          {post.categoria && post.categoria.length > 0 && (
            <span className="category-tag">
              {post.categoria[0].nombre}
            </span>
          )}
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{post.titulo}</h3>
        <p className="card-excerpt">
          {post.contenido.substring(0, 120)}...
        </p>
        
        <div className="card-meta">
          <span className="card-date">
            {formatDate(post.fecha_creacion)}
          </span>
          <div className="card-rating">
            {renderStars(4)}
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="card-stats">
          <button 
            className={`like-button ${liked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
            </svg>
            <span>{post.likes_count || 0}</span>
          </button>
          
          <div className="comments-count">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 6C21 4.9 20.1 4 19 4H5C3.9 4 3 4.9 3 6V14C3 15.1 3.9 16 5 16H11L15 20V16H19C20.1 16 21 15.1 21 14V6Z" fill="currentColor"/>
            </svg>
            <span>{post.comentarios_count || 0}</span>
          </div>
        </div>
        
        <button className="read-more-button">
          Leer más
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </article>
  )
}

export default BlogCard
