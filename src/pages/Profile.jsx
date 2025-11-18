import React, { useState } from 'react'
import { Bell, Calendar, Heart, Star, Trophy, Users, Smartphone, ChevronRight, X } from 'lucide-react'

export default function Profile() {
  // State untuk modal dan data
  const [activeModal, setActiveModal] = useState(null)
  const [userData, setUserData] = useState({
    name: "Frederick Krisna",
    membership: "Pro Member",
    joinDate: "January 2024",
    bookings: 142,
    rating: 4.8,
    level: 12,
    gamesPlayed: 18,
    hoursActive: 36,
    caloriesBurned: 7250,
    pointsEarned: 450
  })

  // Data untuk berbagai fitur
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Booking Confirmed", message: "Your futsal booking at SportCenter is confirmed", time: "2 hours ago", read: false },
    { id: 2, title: "New Achievement", message: "You earned the Weekly Warrior badge", time: "1 day ago", read: false },
    { id: 3, title: "Payment Received", message: "Your refund has been processed", time: "3 days ago", read: false }
  ])

  const [bookingHistory, setBookingHistory] = useState([
    { id: 1, venue: "SportCenter Jakarta", sport: "Futsal", date: "2024-03-15", time: "19:00", status: "Completed" },
    { id: 2, venue: "BadmintonArena Kemang", sport: "Badminton", date: "2024-03-12", time: "20:00", status: "Completed" },
    { id: 3, venue: "Basketball Court Central", sport: "Basketball", date: "2024-03-20", time: "18:00", status: "Upcoming" }
  ])

  const [favoriteVenues, setFavoriteVenues] = useState([
    { id: 1, name: "SportCenter Jakarta", sport: "Futsal", rating: 4.8 },
    { id: 2, name: "BadmintonArena Kemang", sport: "Badminton", rating: 4.9 },
    { id: 3, name: "Elite Basketball Court", sport: "Basketball", rating: 4.7 }
  ])

  const [reviews, setReviews] = useState([
    { id: 1, venue: "SportCenter Jakarta", rating: 5, comment: "Great facilities and friendly staff!", date: "2024-03-10" },
    { id: 2, venue: "BadmintonArena Kemang", rating: 4, comment: "Good courts but a bit crowded", date: "2024-02-28" }
  ])

  const [achievements, setAchievements] = useState([
    { id: 1, name: "Weekly Warrior", description: "Play 5 times in one week", earned: true, date: "2024-03-15" },
    { id: 2, name: "Early Bird", description: "Book before 8 AM", earned: true, date: "2024-03-10" },
    { id: 3, name: "Social Butterfly", description: "Play with 10 different people", earned: false }
  ])

  // Handler functions
  const handleEditProfile = () => {
    setActiveModal('edit-profile')
  }

  const handleSaveProfile = (updatedData) => {
    setUserData(updatedData)
    setActiveModal(null)
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const handleCancelBooking = (bookingId) => {
    setBookingHistory(bookingHistory.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'Cancelled' } : booking
    ))
  }

  const handleRemoveFavorite = (venueId) => {
    setFavoriteVenues(favoriteVenues.filter(venue => venue.id !== venueId))
  }

  const handleDeleteReview = (reviewId) => {
    setReviews(reviews.filter(review => review.id !== reviewId))
  }

  // Modal components
  const EditProfileModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Edit Profile</h3>
            <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              value={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Membership Level</label>
            <select 
              value={userData.membership}
              onChange={(e) => setUserData({...userData, membership: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option>Basic Member</option>
              <option>Pro Member</option>
              <option>Elite Member</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Games Played</label>
              <input 
                type="number" 
                value={userData.gamesPlayed}
                onChange={(e) => setUserData({...userData, gamesPlayed: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hours Active</label>
              <input 
                type="number" 
                value={userData.hoursActive}
                onChange={(e) => setUserData({...userData, hoursActive: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        <div className="p-6 border-t flex gap-3">
          <button 
            onClick={() => setActiveModal(null)}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => handleSaveProfile(userData)}
            className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )

  const NotificationsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Notifications</h3>
            <div className="flex gap-2">
              <button 
                onClick={handleMarkAllAsRead}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Mark all as read
              </button>
              <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {notifications.map(notification => (
            <div key={notification.id} className={`p-4 border rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{notification.title}</h4>
                  <p className="text-gray-600">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                </div>
                <button 
                  onClick={() => handleDeleteNotification(notification.id)}
                  className="p-1 hover:bg-red-100 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const BookingHistoryModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Booking History</h3>
            <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {bookingHistory.map(booking => (
              <div key={booking.id} className="p-4 border rounded-lg hover:shadow-md transition-all">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{booking.venue}</h4>
                    <p className="text-gray-600">{booking.sport} • {booking.date} at {booking.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                    {booking.status === 'Upcoming' && (
                      <button 
                        onClick={() => handleCancelBooking(booking.id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const FavoriteVenuesModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Favorite Venues</h3>
            <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {favoriteVenues.map(venue => (
            <div key={venue.id} className="p-4 border rounded-lg hover:shadow-md transition-all">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{venue.name}</h4>
                  <p className="text-gray-600">{venue.sport} • Rating: {venue.rating}/5</p>
                </div>
                <button 
                  onClick={() => handleRemoveFavorite(venue.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const MyReviewsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">My Reviews</h3>
            <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="p-4 border rounded-lg hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{review.venue}</h4>
                  <div className="flex items-center gap-1 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-sm text-gray-500 mt-1">{review.date}</p>
                </div>
                <button 
                  onClick={() => handleDeleteReview(review.id)}
                  className="p-1 hover:bg-red-100 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const AchievementsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Achievements</h3>
            <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {achievements.map(achievement => (
            <div key={achievement.id} className={`p-4 border rounded-lg ${
              achievement.earned ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center gap-4">
                <Trophy className={`w-8 h-8 ${achievement.earned ? 'text-yellow-500' : 'text-gray-300'}`} />
                <div className="flex-1">
                  <h4 className="font-semibold">{achievement.name}</h4>
                  <p className="text-gray-600 text-sm">{achievement.description}</p>
                  {achievement.earned && (
                    <p className="text-sm text-green-600 mt-1">Earned on {achievement.date}</p>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  achievement.earned ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {achievement.earned ? 'Unlocked' : 'Locked'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const AppSettingsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">App Settings</h3>
            <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h4 className="font-semibold mb-4">Notifications</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span>Push Notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </label>
              <label className="flex items-center justify-between">
                <span>Email Notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </label>
              <label className="flex items-center justify-between">
                <span>SMS Alerts</span>
                <input type="checkbox" className="rounded" />
              </label>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Privacy</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span>Show activity status</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </label>
              <label className="flex items-center justify-between">
                <span>Public profile</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </label>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Language</h4>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
              <option>English</option>
              <option>Indonesian</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>
        <div className="p-6 border-t">
          <button className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )

  // Menu items dengan handler
  const menuItems = [
    { 
      icon: Bell, 
      label: "Notifications", 
      badge: notifications.filter(n => !n.read).length.toString(), 
      desc: "Manage your notifications", 
      color: "from-purple-500 to-pink-500",
      onClick: () => setActiveModal('notifications')
    },
    { 
      icon: Calendar, 
      label: "Booking History", 
      desc: "View past and upcoming bookings", 
      color: "from-blue-500 to-cyan-500",
      onClick: () => setActiveModal('booking-history')
    },
    { 
      icon: Heart, 
      label: "Favorite Venues", 
      desc: "Your saved venues", 
      color: "from-red-500 to-rose-500",
      onClick: () => setActiveModal('favorite-venues')
    },
    { 
      icon: Star, 
      label: "My Reviews", 
      desc: "Reviews you've written", 
      color: "from-yellow-500 to-orange-500",
      onClick: () => setActiveModal('my-reviews')
    },
    { 
      icon: Trophy, 
      label: "Achievements", 
      desc: "Your earned badges and trophies", 
      color: "from-emerald-500 to-teal-500",
      onClick: () => setActiveModal('achievements')
    },
    { 
      icon: Smartphone, 
      label: "App Settings", 
      desc: "Customize your experience", 
      color: "from-indigo-500 to-purple-500",
      onClick: () => setActiveModal('app-settings')
    }
  ]

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
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg">
                      <Trophy className="w-5 h-5 text-yellow-900" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-1">{userData.name}</h2>
                    <p className="text-emerald-100 mb-5 flex items-center gap-2">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{userData.membership}</span>
                      <span>• Since {userData.joinDate}</span>
                    </p>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                        <p className="text-3xl font-bold text-white mb-1">{userData.bookings}</p>
                        <p className="text-emerald-50 text-sm">Bookings</p>
                      </div>
                      <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                        <p className="text-3xl font-bold text-white mb-1 flex items-center justify-center gap-1">
                          {userData.rating} <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                        </p>
                        <p className="text-emerald-50 text-sm">Rating</p>
                      </div>
                      <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                        <p className="text-3xl font-bold text-white mb-1">{userData.level}</p>
                        <p className="text-emerald-50 text-sm">Level</p>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleEditProfile}
                    className="bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div 
                    key={index} 
                    onClick={item.onClick}
                    className="cursor-pointer hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-1 shadow-md overflow-hidden group bg-white rounded-xl relative"
                  >
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
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{userData.gamesPlayed}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium">Hours Active</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{userData.hoursActive}h</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium">Calories Burned</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{userData.caloriesBurned.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium">Points Earned</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">{userData.pointsEarned}</span>
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

      {/* Modals */}
      {activeModal === 'edit-profile' && <EditProfileModal />}
      {activeModal === 'notifications' && <NotificationsModal />}
      {activeModal === 'booking-history' && <BookingHistoryModal />}
      {activeModal === 'favorite-venues' && <FavoriteVenuesModal />}
      {activeModal === 'my-reviews' && <MyReviewsModal />}
      {activeModal === 'achievements' && <AchievementsModal />}
      {activeModal === 'app-settings' && <AppSettingsModal />}
    </div>
  )
}