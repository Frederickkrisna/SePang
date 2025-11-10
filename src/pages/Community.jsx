import React, { useState } from 'react'
import { Trophy, Users, Calendar, GamepadIcon as Game, X, Check, MapPin, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function Community() {
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [showCreateEventModal, setShowCreateEventModal] = useState(false)
  const [eventType, setEventType] = useState('')
  const [joinedEvents, setJoinedEvents] = useState(new Set())

  const events = [
    {
      id: 1,
      title: "Liga Futsal Mingguan",
      sport: "Futsal",
      date: "Nov 15, 2024",
      participants: 24,
      maxParticipants: 32,
      prize: "Trophy + Rp 2.000.000",
      location: "GOR Senayan, Jakarta",
      fee: "Rp 100.000/team"
    },
    {
      id: 2,
      title: "Badminton Championship",
      sport: "Badminton",
      date: "Nov 20, 2024",
      participants: 45,
      maxParticipants: 64,
      prize: "Trophy + Rp 5.000.000",
      location: "Istora Senayan, Jakarta",
      fee: "Rp 150.000/person"
    },
    {
      id: 3,
      title: "Basketball 3x3 Tournament",
      sport: "Basketball",
      date: "Nov 22, 2024",
      participants: 16,
      maxParticipants: 16,
      prize: "Trophy + Rp 3.000.000",
      location: "Lapangan Basket Gelora Bung Karno",
      fee: "Rp 200.000/team"
    },
    {
      id: 4,
      title: "Tennis Open Series",
      sport: "Tennis",
      date: "Nov 25, 2024",
      participants: 28,
      maxParticipants: 32,
      prize: "Trophy + Rp 4.000.000",
      location: "Senayan Tennis Court",
      fee: "Rp 250.000/person"
    }
  ]

  const handleJoinEvent = (event) => {
    if (event.participants >= event.maxParticipants) {
      setNotificationMessage('Event sudah penuh!')
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 2000)
      return
    }

    setJoinedEvents(prev => new Set([...prev, event.id]))
    setNotificationMessage(`Berhasil join ${event.title}!`)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }

  const handleCreateEvent = (type) => {
    setEventType(type)
    setShowCreateEventModal(true)
  }

  const handleSubmitEvent = (e) => {
    e.preventDefault()
    setShowCreateEventModal(false)
    setNotificationMessage(`${eventType === 'tournament' ? 'Tournament' : 'Gathering'} berhasil dibuat!`)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
          <Alert className="bg-green-600 text-white border-green-700">
            <Check className="h-4 w-4" />
            <AlertDescription>{notificationMessage}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Buat {eventType === 'tournament' ? 'Tournament' : 'Gathering'}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowCreateEventModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nama Event</label>
                  <input
                    type="text"
                    placeholder="Masukkan nama event"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Olahraga</label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" required>
                    <option value="">Pilih olahraga</option>
                    <option value="futsal">Futsal</option>
                    <option value="badminton">Badminton</option>
                    <option value="basketball">Basketball</option>
                    <option value="tennis">Tennis</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tanggal</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Lokasi</label>
                  <input
                    type="text"
                    placeholder="Masukkan lokasi"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Maksimal Peserta</label>
                  <input
                    type="number"
                    min="4"
                    max="100"
                    placeholder="16"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                  />
                </div>
                {eventType === 'tournament' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Hadiah</label>
                    <input
                      type="text"
                      placeholder="Trophy + Rp 1.000.000"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                  </div>
                )}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                    Buat Event
                  </Button>
                  <Button type="button" onClick={() => setShowCreateEventModal(false)} variant="outline" className="flex-1">
                    Batal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3">Community & Events 🏆</h1>
              <p className="text-gray-600 text-lg">Bergabung dengan turnamen dan event seru!</p>
            </div>

            {/* Active Events */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Event Aktif</h3>
                <Button variant="ghost" className="text-green-600 hover:text-green-700">
                  View All Events
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {events.map(event => {
                  const isFull = event.participants >= event.maxParticipants
                  const isJoined = joinedEvents.has(event.id)
                  
                  return (
                    <Card key={event.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                                <Badge className="px-3 py-1 bg-green-500 mb-2">{event.sport}</Badge>
                              </div>
                              <Badge variant="outline" className="px-3 py-1">
                                <Calendar className="w-3 h-3 mr-1" />
                                {event.date}
                              </Badge>
                            </div>
                            
                            <div className="space-y-3 mb-4">
                              <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{event.location}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Participants</span>
                                <span className={`font-bold ${isFull ? 'text-red-600' : 'text-green-600'}`}>
                                  {event.participants}/{event.maxParticipants}
                                </span>
                              </div>
                              <Progress value={(event.participants / event.maxParticipants) * 100} className="h-2" />
                              
                              <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                                <p className="text-yellow-800 font-medium">🏆 {event.prize}</p>
                              </div>
                              
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Biaya pendaftaran:</span>
                                <span className="font-bold text-green-600">{event.fee}</span>
                              </div>
                            </div>
                            
                            <Button 
                              className={`w-full ${isJoined ? 'bg-gray-400' : isFull ? 'bg-gray-300' : 'bg-green-600 hover:bg-green-700'}`}
                              disabled={isFull || isJoined}
                              onClick={() => handleJoinEvent(event)}
                            >
                              {isJoined ? '✓ Sudah Terdaftar' : isFull ? 'Event Penuh' : 'Join Event'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Create Event */}
            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <CardTitle className="text-xl">Buat Event Sendiri</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">Organize your own tournament and invite the community!</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    className="h-12 bg-green-600 hover:bg-green-700"
                    onClick={() => handleCreateEvent('tournament')}
                  >
                    <Game className="w-5 h-5 mr-2" />
                    Buat Tournament
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-12 border-green-300 hover:bg-green-50"
                    onClick={() => handleCreateEvent('gathering')}
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Buat Gathering
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Community Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "Ahmad", action: "won Liga Futsal Mingguan", time: "2 hours ago", avatar: "A" },
                    { user: "Sarah", action: "joined Tournament Badminton", time: "4 hours ago", avatar: "S" },
                    { user: "Kevin", action: "created new Basketball event", time: "6 hours ago", avatar: "K" },
                    { user: "Diana", action: "achieved 'Community Builder' badge", time: "8 hours ago", avatar: "D" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-green-500 text-white">{activity.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium"><span className="text-green-600">{activity.user}</span> {activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Weekly Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: "Frederick", points: 2450, avatar: "FR" },
                    { rank: 2, name: "Jemes", points: 2280, avatar: "JT" },
                    { rank: 3, name: "Jose Austin", points: 2100, avatar: "JA" },
                    { rank: 4, name: "You (John D.)", points: 1750, avatar: "JD", isYou: true }
                  ].map(player => (
                    <div key={player.rank} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${player.isYou ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        player.rank === 1 ? 'bg-yellow-400 text-white' :
                        player.rank === 2 ? 'bg-gray-400 text-white' :
                        player.rank === 3 ? 'bg-orange-400 text-white' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {player.rank}
                      </div>
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className={player.isYou ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}>{player.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${player.isYou ? 'text-blue-600' : ''}`}>{player.name}</p>
                      </div>
                      <p className="text-sm font-semibold text-blue-600">{player.points} pts</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Members</span>
                  <span className="font-bold text-blue-600">12,547</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Events</span>
                  <span className="font-bold text-green-600">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Games This Week</span>
                  <span className="font-bold text-green-600">1,432</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Your Rank</span>
                  <Badge className="bg-green-500">#142</Badge>
                </div>
              </CardContent>
            </Card>

            {/* My Events */}
            <Card>
              <CardHeader>
                <CardTitle>My Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Weekend Futsal", date: "Tomorrow", status: "Confirmed" },
                  { name: "Badminton League", date: "Oct 15", status: "Pending" }
                ].map((event, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium">{event.name}</p>
                      <Badge variant={event.status === 'Confirmed' ? 'default' : 'secondary'} className={event.status === 'Confirmed' ? 'bg-green-500' : ''}>
                        {event.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {event.date}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}