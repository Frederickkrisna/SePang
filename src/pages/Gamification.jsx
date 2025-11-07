import React, { useState } from 'react'
import { Target, Medal, Trophy, Users, Zap, ArrowRight, Gift, Star, Crown, Flame, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Progress } from '../components/ui/progress'
import { Modal } from '../components/ui/modal'
import { achievements, rewards, friends } from '../data/mockData'

export default function Gamification() {
  const [userPoints, setUserPoints] = useState(1750)
  const [userLevel, setUserLevel] = useState(12)
  const [showAllAchievements, setShowAllAchievements] = useState(false)
  const [showAllRewards, setShowAllRewards] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)
  const [showRedeemModal, setShowRedeemModal] = useState(false)
  
  // State baru untuk Quick Actions
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false)
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [weeklyGoal, setWeeklyGoal] = useState(3)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [selectedFriends, setSelectedFriends] = useState([])

  const nextLevelPoints = 2000
  const pointsToNextLevel = nextLevelPoints - userPoints

  const getIconComponent = (iconName) => {
    const icons = {
      Target: Target,
      Medal: Medal,
      Trophy: Trophy,
      Users: Users,
      Zap: Zap,
      Gift: Gift,
      Star: Star,
      Crown: Crown,
      Flame: Flame
    }
    return icons[iconName] || Target
  }

  const handleRedeemReward = (reward) => {
    if (userPoints >= reward.pointsRequired) {
      setSelectedReward(reward)
      setShowRedeemModal(true)
    }
  }

  const confirmRedeem = () => {
    if (selectedReward) {
      setUserPoints(prev => prev - selectedReward.pointsRequired)
      setShowRedeemModal(false)
      setSelectedReward(null)
      alert(`Selamat! Anda berhasil menukar ${selectedReward.pointsRequired} points untuk ${selectedReward.name}`)
    }
  }

  // Handler untuk Daily Check-in
  const handleDailyCheckIn = () => {
    if (!hasCheckedInToday) {
      setUserPoints(prev => prev + 10)
      setHasCheckedInToday(true)
      alert('Berhasil check-in! +10 points')
    } else {
      alert('Anda sudah check-in hari ini!')
    }
  }

  // Handler untuk Set Weekly Goal
  const handleSetWeeklyGoal = () => {
    setShowGoalModal(true)
  }

  const saveWeeklyGoal = () => {
    setShowGoalModal(false)
    alert(`Target mingguan disetel menjadi ${weeklyGoal} sesi!`)
  }

  // Handler untuk Invite Friends
  const handleInviteFriends = () => {
    setShowInviteModal(true)
  }

  const toggleFriendSelection = (friendId) => {
    setSelectedFriends(prev => 
      prev.includes(friendId) 
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    )
  }

  const sendInvitations = () => {
    if (selectedFriends.length === 0) {
      alert('Pilih setidaknya satu teman untuk diundang!')
      return
    }
    
    const invitedFriends = friends.filter(friend => selectedFriends.includes(friend.id))
    alert(`Undangan berhasil dikirim ke ${invitedFriends.length} teman!`)
    setShowInviteModal(false)
    setSelectedFriends([])
  }

  const displayedAchievements = showAllAchievements ? achievements : achievements.slice(0, 4)
  const displayedRewards = showAllRewards ? rewards : rewards.slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Player Stats */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">JD</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold text-white">
                    {userLevel}
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold mb-2 text-gray-900">John Doe</h2>
                  <Badge className="mb-6 px-4 py-2 text-sm bg-gradient-to-r from-yellow-400 to-yellow-500 text-white border-0">
                    🏆 Level {userLevel} Explorer
                  </Badge>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Total Points</span>
                      <span className="text-2xl font-bold text-green-600">{userPoints.toLocaleString()}</span>
                    </div>
                    <div className="space-y-2">
                      <Progress value={(userPoints / nextLevelPoints) * 100} className="h-3 bg-gray-200" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{userPoints} points</span>
                        <span className="font-semibold">{pointsToNextLevel} points to Level {userLevel + 1}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Achievements</h3>
                <p className="text-gray-600">Selesaikan misi dan dapatkan poin bonus!</p>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setShowAllAchievements(!showAllAchievements)}
                className="flex items-center gap-2 text-green-600 hover:text-green-700"
              >
                {showAllAchievements ? 'Show Less' : 'View All'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {displayedAchievements.map(achievement => {
                const IconComponent = getIconComponent(achievement.icon)
                return (
                  <Card 
                    key={achievement.id} 
                    className={`transition-all duration-300 hover:scale-105 ${
                      achievement.completed 
                        ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-md' 
                        : 'bg-white border-gray-200 hover:shadow-lg'
                    }`}
                  >
                    <CardContent className="p-6 pt-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${
                          achievement.completed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{achievement.name}</h4>
                            <Badge className={`${
                              achievement.completed 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              +{achievement.points} pts
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                          
                          {!achievement.completed && achievement.progress && (
                            <div className="space-y-2">
                              <Progress value={achievement.progress} className="h-2 bg-gray-200" />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>Progress</span>
                                <span>{achievement.progress}%</span>
                              </div>
                            </div>
                          )}
                          
                          {achievement.completed && (
                            <div className="flex items-center gap-2 text-green-600 text-sm">
                              <span>✅ Completed</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Points Store */}
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-6">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl text-gray-900 mb-2">Points Store</CardTitle>
                  <p className="text-gray-600">Tukar poin Anda dengan hadiah menarik</p>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowAllRewards(!showAllRewards)}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700"
                >
                  {showAllRewards ? 'Show Less' : 'View All'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedRewards.map(reward => {
                  const IconComponent = getIconComponent(reward.icon)
                  const canRedeem = userPoints >= reward.pointsRequired
                  
                  return (
                    <div 
                      key={reward.id}
                      className={`border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
                        canRedeem 
                          ? 'border-green-200 hover:border-green-300 bg-white' 
                          : 'border-gray-200 bg-gray-50 opacity-75'
                      }`}
                    >
                      <div className="text-center mb-4">
                        <div className={`inline-flex p-3 rounded-full mb-3 ${
                          canRedeem ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'
                        }`}>
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{reward.name}</h4>
                        <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Harga:</span>
                          <span className={`font-semibold ${
                            canRedeem ? 'text-green-600' : 'text-gray-400'
                          }`}>
                            {reward.pointsRequired} points
                          </span>
                        </div>
                        
                        <Button 
                          className={`w-full ${
                            canRedeem 
                              ? 'bg-green-500 hover:bg-green-600 text-white' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={!canRedeem}
                          onClick={() => handleRedeemReward(reward)}
                        >
                          {canRedeem ? 'Tukar Sekarang' : 'Poin Tidak Cukup'}
                        </Button>
                        
                        {!canRedeem && (
                          <p className="text-xs text-center text-gray-500">
                            Butuh {reward.pointsRequired - userPoints} points lagi
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Health Tracker */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Flame className="w-5 h-5 text-orange-500" />
                Health & Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <p className="text-2xl font-bold text-green-600 mb-1">142</p>
                  <p className="text-gray-600 text-sm">Games Played</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                  <p className="text-2xl font-bold text-orange-600 mb-1">28.5k</p>
                  <p className="text-gray-600 text-sm">Calories Burned</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <p className="text-2xl font-bold text-blue-600 mb-1">156h</p>
                  <p className="text-gray-600 text-sm">Total Playtime</p>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Target Minggu Ini</h4>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">{weeklyGoal} sesi target</span>
                  <span className="text-green-500 font-semibold">2/{weeklyGoal} completed</span>
                </div>
                <Progress value={(2/weeklyGoal) * 100} className="h-2 mb-3 bg-gray-200" />
                <p className="text-sm text-gray-600">{weeklyGoal - 2} sesi lagi untuk mencapai target!</p>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Crown className="w-5 h-5 text-yellow-500" />
                Weekly Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "Frederick", points: 2450, avatar: "FR", isYou: false },
                  { rank: 2, name: "Jemes", points: 2280, avatar: "JT", isYou: false },
                  { rank: 3, name: "Jose Austin", points: 2100, avatar: "JA", isYou: false },
                  { rank: 4, name: "You (John D.)", points: userPoints, avatar: "JD", isYou: true }
                ].map(player => (
                  <div 
                    key={player.rank} 
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      player.isYou 
                        ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      player.rank === 1 ? 'bg-yellow-400 text-white' :
                      player.rank === 2 ? 'bg-gray-400 text-white' :
                      player.rank === 3 ? 'bg-orange-400 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {player.rank}
                    </div>
                    <Avatar className={`w-8 h-8 ${player.isYou ? 'ring-2 ring-blue-400' : ''}`}>
                      <AvatarFallback className={player.isYou ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}>
                        {player.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        player.isYou ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {player.name}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-blue-600">{player.points.toLocaleString()} pts</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className={`w-full justify-start ${
                  hasCheckedInToday 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
                onClick={handleDailyCheckIn}
                disabled={hasCheckedInToday}
              >
                <Zap className="w-4 h-4 mr-2" />
                {hasCheckedInToday ? 'Sudah Check-in Hari Ini' : 'Daily Check-in (+10 pts)'}
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleSetWeeklyGoal}
              >
                <Target className="w-4 h-4 mr-2" />
                Set Weekly Goal
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleInviteFriends}
              >
                <Users className="w-4 h-4 mr-2" />
                Invite Friends
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Redeem Confirmation Modal */}
      <Modal 
        isOpen={showRedeemModal} 
        onClose={() => {
          setShowRedeemModal(false)
          setSelectedReward(null)
        }}
        title="Konfirmasi Penukaran"
      >
        {selectedReward && (
          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedReward.name}</h3>
              <p className="text-gray-600">{selectedReward.description}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Poin Anda:</span>
                <span className="font-semibold">{userPoints} pts</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Biaya penukaran:</span>
                <span className="font-semibold text-red-500">-{selectedReward.pointsRequired} pts</span>
              </div>
              <div className="flex justify-between items-center border-t pt-2">
                <span className="text-gray-600">Sisa poin:</span>
                <span className="font-semibold text-green-600">{userPoints - selectedReward.pointsRequired} pts</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => {
                  setShowRedeemModal(false)
                  setSelectedReward(null)
                }}
              >
                Batal
              </Button>
              <Button 
                className="flex-1 bg-green-500 hover:bg-green-600"
                onClick={confirmRedeem}
              >
                Konfirmasi Tukar
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Set Weekly Goal Modal */}
      <Modal 
        isOpen={showGoalModal} 
        onClose={() => setShowGoalModal(false)}
        title="Set Target Mingguan"
      >
        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Atur Target Mingguan</h3>
            <p className="text-gray-600">Berapa banyak sesi olahraga yang ingin Anda capai minggu ini?</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Jumlah Sesi:</span>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => weeklyGoal > 1 && setWeeklyGoal(weeklyGoal - 1)}
                  disabled={weeklyGoal <= 1}
                >
                  -
                </Button>
                <span className="text-xl font-bold w-8 text-center">{weeklyGoal}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setWeeklyGoal(weeklyGoal + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Target saat ini:</span>
                <span className="font-semibold">{weeklyGoal} sesi/minggu</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={() => setShowGoalModal(false)}
            >
              Batal
            </Button>
            <Button 
              className="flex-1 bg-blue-500 hover:bg-blue-600"
              onClick={saveWeeklyGoal}
            >
              Simpan Target
            </Button>
          </div>
        </div>
      </Modal>

      {/* Invite Friends Modal */}
      <Modal 
        isOpen={showInviteModal} 
        onClose={() => {
          setShowInviteModal(false)
          setSelectedFriends([])
        }}
        title="Undang Teman"
      >
        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Undang Teman Bermain</h3>
            <p className="text-gray-600">Pilih teman yang ingin Anda undang untuk bermain bersama</p>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {friends.map(friend => (
              <div
                key={friend.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedFriends.includes(friend.id)
                    ? 'bg-purple-50 border-purple-200'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => toggleFriendSelection(friend.id)}
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-purple-500 text-white">
                    {friend.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{friend.name}</p>
                  <p className="text-sm text-gray-500">{friend.skillLevel} • {friend.lastActive}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${
                  selectedFriends.includes(friend.id)
                    ? 'bg-purple-500 border-purple-500'
                    : 'border-gray-300'
                }`}>
                  {selectedFriends.includes(friend.id) && (
                    <div className="w-full h-full flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Teman terpilih:</span>
              <span className="font-semibold text-purple-600">{selectedFriends.length} teman</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={() => {
                setShowInviteModal(false)
                setSelectedFriends([])
              }}
            >
              Batal
            </Button>
            <Button 
              className="flex-1 bg-purple-500 hover:bg-purple-600"
              onClick={sendInvitations}
            >
              Kirim Undangan
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}