'use client'

import { useState } from 'react'
import { Send, Mic, Volume2 } from 'lucide-react'

interface ChatInterfaceProps {
  placeholder?: string
  onSendMessage?: (message: string) => void
}

export default function ChatInterface({ 
  placeholder = "Ask anything", 
  onSendMessage 
}: ChatInterfaceProps) {
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage?.(message)
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Add voice recording logic here
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative bg-gray-800 rounded-2xl border border-gray-700 shadow-lg">
          {/* Input field */}
          <div className="flex items-center px-4 py-3">
            {/* Plus icon */}
            <div className="flex-shrink-0 mr-3">
              <div className="w-6 h-6 flex items-center justify-center text-white">
                <span className="text-lg font-light">+</span>
              </div>
            </div>
            
            {/* Text input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                autoFocus
              />
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center space-x-2 ml-3">
              {/* Voice recording button */}
              <button
                type="button"
                onClick={toggleRecording}
                className={`p-2 rounded-full transition-colors ${
                  isRecording 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>
              
              {/* Send button */}
              <button
                type="submit"
                disabled={!message.trim()}
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
