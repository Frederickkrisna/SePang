import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Home, Heart, Trophy, Users, User, Bell } from 'lucide-react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'

export default function Header({ activeTab, setActiveTab }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const popupRef = useRef(null)

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'match', icon: Heart, label: 'Matchmaking' },
    { id: 'rewards', icon: Trophy, label: 'Rewards' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'profile', icon: User, label: 'Profile' }
  ]

  const notifications = [
    { id: 1, message: 'Booking lapangan futsal kamu sudah dikonfirmasi ✅', time: '2 jam lalu' },
    { id: 2, message: 'Kamu mendapatkan 50 poin reward baru 🎁', time: '1 hari lalu' },
    { id: 3, message: 'Temanmu mengundangmu ke pertandingan ⚽', time: '3 hari lalu' }
  ]

  // Tutup popup kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo dan Tabs */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                <img
                  src="/src/assets/sepang_logo.png"
                  alt="Sepang Logo"
                  className="w-max h-max object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SePang</h1>
                <p className="text-sm text-gray-600">Sports Booking Platform</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center ml-20 gap-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium text-sm ${
                      activeTab === tab.id
                        ? 'bg-green-500 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* User Actions */}
          <div className="relative flex items-center gap-3" ref={popupRef}>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900 relative"
              onClick={() => setShowNotifications((prev) => !prev)}
            >
              <Bell className="w-5 h-5" />
              {/* Indicator bulatan merah kalau ada notif */}
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              )}
            </Button>

            {/* Popup Notifikasi */}
            {showNotifications && (
              <div className="absolute right-0 top-10 w-80 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden animate-fade-in">
                <div className="p-3 border-b bg-gray-50 font-semibold text-gray-700">
                  Notifikasi
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-3 hover:bg-gray-50 transition flex flex-col border-b last:border-0"
                    >
                      <p className="text-sm text-gray-800">{notif.message}</p>
                      <span className="text-xs text-gray-500 mt-1">{notif.time}</span>
                    </div>
                  ))}
                  {notifications.length === 0 && (
                    <div className="p-4 text-center text-sm text-gray-500">
                      Tidak ada notifikasi baru
                    </div>
                  )}
                </div>
              </div>
            )}
            <Link to="/profile">
              <Avatar className="w-8 h-8 border-2 border-green-200 cursor-pointer hover:scale-105 transition-transform">
                <AvatarFallback className="bg-green-100 text-green-600 font-medium">FK</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}