import React, { useState } from 'react'

export function ImageWithFallback({ 
  src, 
  alt, 
  fallbackSrc = "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  className = '',
  ...props 
}) {
  const [error, setError] = useState(false)

  const handleError = () => {
    setError(true)
  }

  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  )
}