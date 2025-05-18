import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Flashcards from './pages/Flashcards'
import Pomodoro from './pages/Pomodoro'
import Notes from './pages/Notes'

export default function App() {
  return (
    
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="custom-cursor"></div>

      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Flashcards />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </div>
    </div>
  )
}


<nav class="w-full bg-gradient-to-r from-pink-400 to-orange-400 shadow-md p-4 flex items-center justify-between">
  <div class="text-white text-2xl font-bold">
    Smart Learning Hub
  </div>
  <div class="flex space-x-6 text-white font-medium">
    <a href="#flashcards" class="hover:underline flex items-center">
      <span class="mr-1">📚</span> Flashcards
    </a>
    <a href="#pomodoro" class="hover:underline flex items-center">
      <span class="mr-1">⏱️</span> Pomodoro
    </a>
    <a href="#notes" class="hover:underline flex items-center">
      <span class="mr-1">📝</span> Notes
    </a>
  </div>
</nav>
