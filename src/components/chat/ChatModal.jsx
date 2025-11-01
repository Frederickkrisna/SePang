import React from 'react'

export default function ChatModal({ open, onClose, match }) {
  if (!open || !match) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">{match.name[0]}</span>
              </div>
              <div>
                <h3 className="font-semibold">Chat dengan {match.name}</h3>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-4 h-64 overflow-y-auto">
          {/* Isi chat room akan tampil di sini */}
          <div className="text-center text-gray-500 py-8">
            <p>Mulai percakapan dengan {match.name}</p>
          </div>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Ketik pesan..."
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}