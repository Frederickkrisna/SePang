import React from 'react'
import { Heart, MessageCircle, Users } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { matchProfiles } from '../data/mockData'

export default function Matchmaking() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-3">Cari Teman Sparing 🤝</h1>
          <p className="text-gray-600 text-lg">Temukan lawan atau partner olahraga yang sesuai!</p>
        </div>

        {/* Current Match */}
        {matchProfiles.length > 0 && (
          <Card className="overflow-hidden max-w-2xl mx-auto">
            <div className="relative">
              <div className="h-64 bg-gradient-to-b from-green-400 to-green-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Avatar className="w-32 h-32 border-6 border-white">
                  <AvatarImage src={matchProfiles[0].avatar} />
                  <AvatarFallback className="text-2xl">{matchProfiles[0].name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <Badge className="absolute top-6 right-6 bg-green-500 text-lg px-4 py-2">
                {matchProfiles[0].matchScore}% Match
              </Badge>
            </div>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl mb-2">{matchProfiles[0].name}, {matchProfiles[0].age}</h2>
              <p className="text-gray-600 mb-3 text-lg">{matchProfiles[0].sport} • {matchProfiles[0].level}</p>
              <p className="text-gray-500 mb-3">📍 {matchProfiles[0].distance}</p>
              <p className="mb-6 text-gray-700">{matchProfiles[0].bio}</p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  <Heart className="w-6 h-6" />
                </Button>
                <Button size="lg" className="rounded-full px-8">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat Sekarang
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Match Queue */}
        <div>
          <h3 className="text-xl mb-6">Matches Selanjutnya</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {matchProfiles.slice(1).map(profile => (
              <Card key={profile.id} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="text-lg">{profile.name[0]}</AvatarFallback>
                  </Avatar>
                  <h4 className="text-lg mb-1">{profile.name}</h4>
                  <p className="text-gray-600 mb-2">{profile.sport}</p>
                  <Badge variant="outline" className="mb-3">
                    {profile.matchScore}% Match
                  </Badge>
                  <p className="text-sm text-gray-500 mb-4">{profile.distance}</p>
                  <Button variant="outline" className="w-full">
                    Lihat Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Preferensi Matching</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm mb-3 block">Olahraga Favorit</label>
              <div className="flex gap-2 flex-wrap">
                {['Futsal', 'Badminton', 'Basketball'].map(sport => (
                  <Badge key={sport} variant="outline" className="py-1 px-3">{sport}</Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm mb-3 block">Level Skill</label>
              <Badge className="py-1 px-3">Intermediate</Badge>
            </div>
            <div>
              <label className="text-sm mb-3 block">Jarak Maksimal</label>
              <Badge className="py-1 px-3">5 km</Badge>
            </div>
            <Button className="w-full">
              Edit Preferensi
            </Button>
          </CardContent>
        </Card>

        {/* Match History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Matches</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Rahman", sport: "Futsal", status: "Played" },
              { name: "Diana", sport: "Badminton", status: "Scheduled" },
              { name: "Budi", sport: "Basketball", status: "Cancelled" }
            ].map((match, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm">{match.name}</p>
                  <p className="text-xs text-gray-600">{match.sport}</p>
                </div>
                <Badge variant={match.status === 'Played' ? 'default' : match.status === 'Scheduled' ? 'secondary' : 'outline'}>
                  {match.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}