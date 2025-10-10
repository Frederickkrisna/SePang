import React from 'react'
import { Trophy, Users, Calendar, GamepadIcon as Game } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Progress } from '../components/ui/progress'
import { events } from '../data/mockData'

export default function Community() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-3">Community & Events 🏆</h1>
          <p className="text-gray-600 text-lg">Bergabung dengan turnamen dan event seru!</p>
        </div>

        {/* Active Events */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl">Event Aktif</h3>
            <Button variant="ghost">View All Events</Button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {events.map(event => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg mb-2">{event.title}</h4>
                      <p className="text-gray-600">{event.sport}</p>
                    </div>
                    <Badge className="px-3 py-1">{event.date}</Badge>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Participants</span>
                      <span className="text-green-600">{event.participants}/{event.maxParticipants}</span>
                    </div>
                    <Progress value={(event.participants / event.maxParticipants) * 100} className="h-2" />
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-green-700">🏆 {event.prize}</p>
                    </div>
                  </div>
                  <Button className="w-full" disabled={event.participants >= event.maxParticipants}>
                    {event.participants >= event.maxParticipants ? 'Event Penuh' : 'Join Event'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Create Event */}
        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardHeader>
            <CardTitle className="text-xl">Buat Event Sendiri</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">Organize your own tournament and invite the community!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="h-12">
                <Game className="w-5 h-5 mr-2" />
                Buat Tournament
              </Button>
              <Button variant="outline" className="h-12">
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
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <Avatar>
                    <AvatarFallback>{activity.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p><span>{activity.user}</span> {activity.action}</p>
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
            <CardTitle>Weekly Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { rank: 1, name: "Frederick", points: 2450, avatar: "FR" },
                { rank: 2, name: "Jemes", points: 2280, avatar: "JT" },
                { rank: 3, name: "Jose Austin.", points: 2100, avatar: "JA" },
                { rank: 4, name: "You (John D.)", points: 1750, avatar: "JD" }
              ].map(player => (
                <div key={player.rank} className={`flex items-center gap-3 p-3 rounded-lg ${player.name.includes('You') ? 'bg-blue-50 border border-blue-200' : ''}`}>
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                    {player.rank}
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{player.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">{player.name}</p>
                  </div>
                  <p className="text-sm text-blue-600">{player.points} pts</p>
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
            <div className="flex justify-between">
              <span className="text-gray-600">Total Members</span>
              <span className="text-blue-600">12,547</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Events</span>
              <span className="text-green-600">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Games This Week</span>
              <span className="text-green-600">1,432</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Your Rank</span>
              <Badge>#142</Badge>
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
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm">{event.name}</p>
                  <Badge variant={event.status === 'Confirmed' ? 'default' : event.status === 'Scheduled' ? 'secondary' : 'outline'}>
                    {event.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">{event.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}