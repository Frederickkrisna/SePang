import React, { useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Trophy, Calendar, Star, Edit2, Check, X } from 'lucide-react'

export default function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    username: "@johndoe",
    rank: "#142",
    level: 12,
    points: 1750,
    achievements: 8,
    bio: "Sport enthusiast and community event organizer.",
    avatar: "JD",
    avatarImage: null
  })

  const [editMode, setEditMode] = useState({
    name: false,
    username: false,
    bio: false,
    avatar: false
  })

  const [tempValues, setTempValues] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio,
    avatar: user.avatar,
    avatarImage: user.avatarImage
  })

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUser({ ...user, avatarImage: event.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setUser({ ...user, avatarImage: null })
  }

  const startEdit = (field) => {
    setEditMode({ ...editMode, [field]: true })
    setTempValues({ ...tempValues, [field]: user[field] })
  }

  const saveEdit = (field) => {
    setUser({ ...user, [field]: tempValues[field] })
    setEditMode({ ...editMode, [field]: false })
  }

  const cancelEdit = (field) => {
    setTempValues({ ...tempValues, [field]: user[field] })
    setEditMode({ ...editMode, [field]: false })
  }

  const recentEvents = [
    { name: "Weekend Futsal", date: "Nov 8, 2024", status: "Completed" },
    { name: "Badminton League", date: "Nov 2, 2024", status: "Ongoing" },
    { name: "Basketball 3x3", date: "Oct 25, 2024", status: "Joined" }
  ]

  const badges = [
    { name: "Top Player", icon: <Trophy className="w-4 h-4 text-yellow-500" /> },
    { name: "Event Organizer", icon: <Calendar className="w-4 h-4 text-green-500" /> },
    { name: "MVP", icon: <Star className="w-4 h-4 text-blue-500" /> }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT PROFILE CARD */}
        <Card className="lg:col-span-1">
          <CardContent className="flex flex-col items-center py-8">
            <div className="relative group">
              <Avatar className="w-24 h-24 mb-4">
                {user.avatarImage ? (
                  <img src={user.avatarImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <AvatarFallback className="bg-green-600 text-white text-2xl">
                    {user.avatar}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="absolute bottom-3 right-0 flex gap-1">
                <label className="bg-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-gray-100">
                  <Edit2 className="w-3 h-3 text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {user.avatarImage && (
                  <button
                    onClick={removeImage}
                    className="bg-red-500 rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                )}
              </div>
            </div>



            <div className="w-full flex flex-col items-center">
              {editMode.name ? (
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={tempValues.name}
                    onChange={(e) => setTempValues({ ...tempValues, name: e.target.value })}
                    className="px-3 py-1 border rounded text-xl font-bold text-center"
                  />
                  <button onClick={() => saveEdit('name')} className="text-green-600 hover:text-green-700">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={() => cancelEdit('name')} className="text-red-600 hover:text-red-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <button
                    onClick={() => startEdit('name')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit2 className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              )}

              {editMode.username ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempValues.username}
                    onChange={(e) => setTempValues({ ...tempValues, username: e.target.value })}
                    className="px-2 py-1 border rounded text-sm text-center"
                  />
                  <button onClick={() => saveEdit('username')} className="text-green-600 hover:text-green-700">
                    <Check className="w-3 h-3" />
                  </button>
                  <button onClick={() => cancelEdit('username')} className="text-red-600 hover:text-red-700">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group">
                  <p className="text-gray-500">{user.username}</p>
                  <button
                    onClick={() => startEdit('username')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit2 className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Badge className="bg-green-500 text-white">{user.rank}</Badge>
              <span className="text-sm text-gray-500">Level {user.level}</span>
            </div>

            {editMode.bio ? (
              <div className="w-full mt-4">
                <textarea
                  value={tempValues.bio}
                  onChange={(e) => setTempValues({ ...tempValues, bio: e.target.value })}
                  className="w-full px-3 py-2 border rounded text-sm text-center"
                  rows={3}
                />
                <div className="flex justify-center gap-2 mt-2">
                  <button
                    onClick={() => saveEdit('bio')}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => cancelEdit('bio')}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="group relative w-full">
                <p className="text-center text-gray-600 mt-4">{user.bio}</p>
                <button
                  onClick={() => startEdit('bio')}
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit2 className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            )}

            <div className="w-full mt-6 space-y-3">
              <div>
                <p className="text-sm text-gray-600">Progress Level</p>
                <Progress value={70} className="h-2" />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Points:</span>
                <span className="font-bold text-green-600">{user.points}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Achievements:</span>
                <span className="font-bold text-blue-600">{user.achievements}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              {badges.map((badge, index) => (
                <Badge key={index} className="flex items-center gap-2 bg-gray-100 text-gray-700">
                  {badge.icon}
                  {badge.name}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentEvents.map((event, index) => (
                <div key={index} className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium text-sm">{event.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {event.date}
                    </p>
                  </div>
                  <Badge
                    className={
                      event.status === "Completed"
                        ? "bg-green-500 text-white"
                        : event.status === "Ongoing"
                        ? "bg-yellow-400 text-white"
                        : "bg-gray-300 text-gray-800"
                    }
                  >
                    {event.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}