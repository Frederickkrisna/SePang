import React, { useState } from 'react'
import { Tabs, TabsContent } from './components/ui/tabs'
import Header from './components/layout/Header'
import Home from './pages/Home'
import Matchmaking from './pages/Matchmaking'
import Gamification from './pages/Gamification'
import Community from './pages/Community'
import Profile from './pages/Profile'

export default function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header dengan Navigation yang digabung */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="home" className="mt-0">
            <Home />
          </TabsContent>
          <TabsContent value="match" className="mt-0">
            <Matchmaking />
          </TabsContent>
          <TabsContent value="rewards" className="mt-0">
            <Gamification />
          </TabsContent>
          <TabsContent value="community" className="mt-0">
            <Community />
          </TabsContent>
          <TabsContent value="profile" className="mt-0">
            <Profile />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}