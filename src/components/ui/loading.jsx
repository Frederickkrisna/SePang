import React from 'react'
import { Zap } from 'lucide-react'

export function LoadingSpinner({ size = "default", text = "Loading..." }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-8 h-8",
    lg: "w-12 h-12"
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <Zap className={`${sizeClasses[size]} text-green-500 animate-pulse`} />
        <div className={`absolute inset-0 ${sizeClasses[size]} border-2 border-green-200 border-t-green-500 rounded-full animate-spin`}></div>
      </div>
      {text && <p className="mt-4 text-gray-600">{text}</p>}
    </div>
  )
}

export function AILoadingScheduler() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-50 rounded-lg p-6 mt-3 border border-green-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-green-800">AI Smart Recommendations</h3>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Zap className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex-1">
            <div className="h-4 bg-green-200 rounded animate-pulse mb-2"></div>
            <div className="h-3 bg-green-100 rounded animate-pulse w-3/4"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="h-8 bg-green-200 rounded animate-pulse"></div>
          <div className="h-8 bg-green-200 rounded animate-pulse"></div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm text-green-600">Menganalisis preferensi dan ketersediaan...</p>
        </div>
      </div>
    </div>
  )
}