import React from 'react'
import { Bell, Calendar, Heart, Star, Trophy, Users, Smartphone, ChevronRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Progress } from '../components/ui/progress'

export default function Profile() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Profile Header */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-8">
            <div className="flex items-center gap-8">
              <Avatar className="w-28 h-28">
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl mb-2">John Doe</h2>
                <p className="text-gray-600 mb-4">Member since January 2024</p>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-2xl text-green-500 mb-1">142</p>
                    <p className="text-gray-600">Bookings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl text-green-600 mb-1">4.8</p>
                    <p className="text-gray-600">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl text-green-500 mb-1">12</p>
                    <p className="text-gray-600">Level</p>
                  </div>
                </div>
              </div>
              <Button>Edit Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: Bell, label: "Notifications", badge: "3", desc: "Manage your notifications" },
            { icon: Calendar, label: "Booking History", desc: "View past and upcoming bookings" },
            { icon: Heart, label: "Favorite Venues", desc: "Your saved venues" },
            { icon: Star, label: "My Reviews", desc: "Reviews you've written" },
            { icon: Trophy, label: "Achievements", desc: "Your earned badges and trophies" },
            { icon: Smartphone, label: "App Settings", desc: "Customize your experience" }
          ].map((item, index) => {
            const IconComponent = item.icon
            return (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-all hover:bg-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <IconComponent className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg">{item.label}</h3>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs">{item.badge}</Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Booked Futsal at SportCenter Jakarta", time: "2 hours ago", icon: Calendar },
                { action: "Earned 'Weekly Warrior' achievement", time: "1 day ago", icon: Trophy },
                { action: "Rated BadmintonArena Kemang (5 stars)", time: "2 days ago", icon: Star },
                { action: "Joined Liga Futsal Mingguan", time: "3 days ago", icon: Users }
              ].map((activity, index) => {
                const IconComponent = activity.icon
                return (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <IconComponent className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p>{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Games Played</span>
              <span className="text-blue-600">18</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Hours Active</span>
              <span className="text-green-600">36h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Calories Burned</span>
              <span className="text-green-600">7,250</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Points Earned</span>
              <span className="text-orange-600">450</span>
            </div>
          </CardContent>
        </Card>

        {/* Favorite Sports */}
        <Card>
          <CardHeader>
            <CardTitle>Favorite Sports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { sport: "Futsal", games: 45, percentage: 65 },
              { sport: "Badminton", games: 32, percentage: 25 },
              { sport: "Basketball", games: 15, percentage: 10 }
            ].map((sport, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{sport.sport}</span>
                  <span className="text-sm text-gray-600">{sport.games} games</span>
                </div>
                <Progress value={sport.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Privacy Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Payment Methods
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Support & Help
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}