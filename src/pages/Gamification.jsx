import React from 'react'
import { Target, Medal, Trophy, Users, Zap } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Progress } from '../components/ui/progress'
import { achievements } from '../data/mockData'

export default function Gamification() {
  const userPoints = 1750
  const userLevel = 12
  const nextLevelPoints = 2000

  const getIconComponent = (iconName) => {
    const icons = {
      Target: Target,
      Medal: Medal,
      Trophy: Trophy,
      Users: Users
    }
    return icons[iconName] || Target
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Player Stats */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-8">
            <div className="flex items-center gap-8">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl mb-2">John Doe</h2>
                <Badge className="mb-4 px-3 py-1">Level {userLevel}</Badge>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Points</span>
                    <span className="text-green-600 text-xl">{userPoints.toLocaleString()}</span>
                  </div>
                  <Progress value={(userPoints / nextLevelPoints) * 100} className="h-3" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{userPoints}</span>
                    <span>{nextLevelPoints} (Next Level)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl">Achievements</h3>
            <Button variant="ghost">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {achievements.map(achievement => {
              const IconComponent = getIconComponent(achievement.icon)
              return (
                <Card key={achievement.id} className={achievement.completed ? 'bg-green-50 border-green-200' : 'hover:shadow-md transition-shadow'}>
                  <CardContent className="p-6 text-center">
                    <IconComponent className={`w-12 h-12 mx-auto mb-4 ${achievement.completed ? 'text-green-500' : 'text-gray-400'}`} />
                    <h4 className="mb-2">{achievement.name}</h4>
                    <p className="text-gray-600 mb-3">{achievement.points} pts</p>
                    {!achievement.completed && achievement.progress && (
                      <div className="mb-3">
                        <Progress value={achievement.progress} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">{achievement.progress}% complete</p>
                      </div>
                    )}
                    {achievement.completed && (
                      <Badge className="bg-green-500">Completed</Badge>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Points Store */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">Points Store</CardTitle>
              <Button variant="ghost">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <h4 className="text-lg mb-2">Voucher Diskon 50k</h4>
                  <p className="text-gray-600">Berlaku untuk semua venue</p>
                </div>
                <Button className="w-full" disabled={userPoints < 500}>
                  Tukar 500 pts
                </Button>
              </div>
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <h4 className="text-lg mb-2">Jersey SePang Limited</h4>
                  <p className="text-gray-600">Koleksi eksklusif</p>
                </div>
                <Button className="w-full" disabled={userPoints < 2000}>
                  Tukar 2000 pts
                </Button>
              </div>
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <h4 className="text-lg mb-2">Gratis Booking 1 Jam</h4>
                  <p className="text-gray-600">Venue pilihan Anda</p>
                </div>
                <Button className="w-full" disabled={userPoints < 1000}>
                  Tukar 1000 pts
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Health Tracker */}
        <Card>
          <CardHeader>
            <CardTitle>Health & Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 text-center">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-3xl text-green-500 mb-1">142</p>
                <p className="text-gray-600">Games Played</p>
              </div>
              <div className="p-4 bg-green-100 rounded-lg">
                <p className="text-3xl text-green-600 mb-1">28.5k</p>
                <p className="text-gray-600">Calories Burned</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-3xl text-green-500 mb-1">156h</p>
                <p className="text-gray-600">Total Playtime</p>
              </div>
            </div>
            <div className="border-t pt-6">
              <h4 className="mb-3">Target Minggu Ini</h4>
              <div className="flex justify-between mb-2">
                <span>3 sesi target</span>
                <span className="text-green-500">2/3 completed</span>
              </div>
              <Progress value={66} className="mb-2" />
              <p className="text-sm text-gray-600">1 sesi lagi untuk mencapai target!</p>
            </div>
          </CardContent>
        </Card>

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
      </div>
    </div>
  )
}