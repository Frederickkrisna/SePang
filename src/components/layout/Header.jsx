import React from 'react'
import { Home, Heart, Trophy, Users, User, Bell, MapPin } from 'lucide-react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'

export default function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'match', icon: Heart, label: 'Matchmaking' },
    { id: 'rewards', icon: Trophy, label: 'Rewards' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'profile', icon: User, label: 'Profile' }
  ]

  return (
    <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
      {/* Top Bar - Logo, Location, User */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo dan Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">SP</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SePang</h1>
                <p className="text-sm text-gray-600">Sports Booking Platform</p>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
              </Button>
              <Avatar className="w-8 h-8 border-2 border-green-200">
                <AvatarFallback className="bg-green-100 text-green-600 font-medium">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex items-center">
          {tabs.map(tab => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all font-medium text-sm ${
                  activeTab === tab.id 
                    ? 'border-green-500 text-green-600 bg-green-50' 
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}