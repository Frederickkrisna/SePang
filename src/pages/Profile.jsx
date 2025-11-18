import React from 'react'
import { Bell, Calendar, Heart, Star, Trophy, Users, Smartphone, ChevronRight } from 'lucide-react'

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-2xl shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
              <div className="p-8 relative">
                <div className="flex items-center gap-8">
                  <div className="relative">
                    <div className="w-32 h-32 border-4 border-white shadow-2xl rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white text-3xl font-bold">
                      FK
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg">
                      <Trophy className="w-5 h-5 text-yellow-900" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-1">Frederick Krisna</h2>
                    <p className="text-emerald-100 mb-5 flex items-center gap-2">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Pro Member</span>
                      <span>• Since January 2024</span>
                    </p>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                        <p className="text-3xl font-bold text-white mb-1">142</p>
                        <p className="text-emerald-50 text-sm">Bookings</p>
                      </div>
                      <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                        <p className="text-3xl font-bold text-white mb-1 flex items-center justify-center gap-1">
                          4.8 <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                        </p>
                        <p className="text-emerald-50 text-sm">Rating</p>
                      </div>
                      <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                        <p className="text-3xl font-bold text-white mb-1">12</p>
                        <p className="text-emerald-50 text-sm">Level</p>
                      </div>
                    </div>
                  </div>
                  <button className="bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg px-6 py-2 rounded-lg font-medium transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Bell, label: "Notifications", badge: "3", desc: "Manage your notifications", color: "from-purple-500 to-pink-500" },
                { icon: Calendar, label: "Booking History", desc: "View past and upcoming bookings", color: "from-blue-500 to-cyan-500" },
                { icon: Heart, label: "Favorite Venues", desc: "Your saved venues", color: "from-red-500 to-rose-500" },
                { icon: Star, label: "My Reviews", desc: "Reviews you've written", color: "from-yellow-500 to-orange-500" },
                { icon: Trophy, label: "Achievements", desc: "Your earned badges and trophies", color: "from-emerald-500 to-teal-500" },
                { icon: Smartphone, label: "App Settings", desc: "Customize your experience", color: "from-indigo-500 to-purple-500" }
              ].map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div key={index} className="cursor-pointer hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-1 shadow-md overflow-hidden group bg-white rounded-xl relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                    <div className="p-6 relative">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 bg-gradient-to-br ${item.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{item.label}</h3>
                            {item.badge && (
                              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">{item.badge}</span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Recent Activity */}
            <div className="shadow-lg bg-white rounded-xl overflow-hidden">
              <div className="border-b bg-gradient-to-r from-gray-50 to-white p-6">
                <h3 className="flex items-center gap-2 text-xl font-bold">
                  <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                  Recent Activity
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {[
                    { action: "Booked Futsal at SportCenter Jakarta", time: "2 hours ago", icon: Calendar, color: "from-blue-500 to-cyan-500" },
                    { action: "Earned 'Weekly Warrior' achievement", time: "1 day ago", icon: Trophy, color: "from-yellow-500 to-orange-500" },
                    { action: "Rated BadmintonArena Kemang (5 stars)", time: "2 days ago", icon: Star, color: "from-purple-500 to-pink-500" },
                    { action: "Joined Liga Futsal Mingguan", time: "3 days ago", icon: Users, color: "from-emerald-500 to-teal-500" }
                  ].map((activity, index) => {
                    const IconComponent = activity.icon
                    return (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-xl hover:shadow-md transition-all hover:border-emerald-300 bg-white">
                        <div className={`p-3 bg-gradient-to-br ${activity.color} rounded-xl shadow-md`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="shadow-lg bg-gradient-to-br from-white to-emerald-50 rounded-xl overflow-hidden">
              <div className="border-b p-6">
                <h3 className="flex items-center gap-2 text-xl font-bold">
                  <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                  This Month
                </h3>
              </div>
              <div className="space-y-4 p-6">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium">Games Played</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">18</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium">Hours Active</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">36h</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium">Calories Burned</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">7,250</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium">Points Earned</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">450</span>
                </div>
              </div>
            </div>

            {/* Favorite Sports */}
            <div className="shadow-lg bg-white rounded-xl overflow-hidden">
              <div className="border-b p-6">
                <h3 className="flex items-center gap-2 text-xl font-bold">
                  <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                  Favorite Sports
                </h3>
              </div>
              <div className="space-y-4 p-6">
                {[
                  { sport: "Badminton", games: 45, percentage: 65, color: "from-blue-500 to-cyan-500" },
                  { sport: "Futsal", games: 32, percentage: 25, color: "from-purple-500 to-pink-500" },
                  { sport: "Basketball", games: 15, percentage: 10, color: "from-orange-500 to-red-500" }
                ].map((sport, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{sport.sport}</span>
                      <span className="text-sm text-gray-600 font-medium">{sport.games} games</span>
                    </div>
                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`absolute left-0 top-0 h-full bg-gradient-to-r ${sport.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${sport.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Settings */}
            <div className="shadow-lg bg-white rounded-xl overflow-hidden">
              <div className="border-b p-6">
                <h3 className="flex items-center gap-2 text-xl font-bold">
                  <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                  Account
                </h3>
              </div>
              <div className="space-y-3 p-6">
                <button className="w-full px-4 py-3 border rounded-lg text-left hover:bg-gray-50 transition-colors font-medium">
                  Privacy Settings
                </button>
                <button className="w-full px-4 py-3 border rounded-lg text-left hover:bg-gray-50 transition-colors font-medium">
                  Payment Methods
                </button>
                <button className="w-full px-4 py-3 border rounded-lg text-left hover:bg-gray-50 transition-colors font-medium">
                  Support & Help
                </button>
                <button className="w-full px-4 py-3 border border-red-200 rounded-lg text-left hover:bg-red-50 transition-colors text-red-600 font-medium">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}