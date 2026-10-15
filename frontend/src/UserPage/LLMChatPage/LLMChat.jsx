import React, { useState, useRef, useEffect } from 'react'

function LLMChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'user',
      text: 'Hello!'
    },
    {
      id: 2,
      sender: 'assistant',
      modelTag: 'phi-3.1-mini-4k-instruct-gguf',
      text: 'Hi there! How can I help you today?'
    }
  ])

  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef(null)

  // Automatically scroll the internal message box to the newest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!inputMessage.trim()) return

      const userMsg = {
        id: Date.now(),
        sender: 'user',
        text: inputMessage.trim()
      }

      setMessages((prev) => [...prev, userMsg])
      setInputMessage('')

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'assistant',
            modelTag: 'phi-3.1-mini-4k-instruct-gguf',
            text: 'I am your local AI assistant ready to process your notes and queries.'
          }
        ])
      }, 600)
    }
  }

  return (
    <div className="chat-container h-full min-h-0">
      {/* ---------------- 1. TOP WINDOW BAR ---------------- */}
      <header className="chat-topbar shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-semibold text-secondary-text">
            <span>Chats</span>
            <button className="chat-icon-btn" title="Add Folder">
              <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Active Model Selector Pill */}
        <div className="chat-badge cursor-pointer hover:bg-secondary-text/90">
          <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
          </svg>
          <span className="font-mono text-[11px]">lmstudio-community/Phi-3.1-mini-4k-instruct-GGUF</span>
          <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>

        <div>
          <button className="px-2.5 py-1 text-xs rounded bg-accent/20 hover:bg-accent/30 text-secondary-text font-medium flex items-center gap-1 transition-colors">
            <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
            </svg>
            Eject
          </button>
        </div>
      </header>

      {/* ---------------- 2. MAIN SPLIT BODY (min-h-0 prevents stretching) ---------------- */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Sub-sidebar */}
        <aside className="chat-sidebar shrink-0">
          <div className="flex flex-col gap-1">
            <div className="text-[11px] font-semibold text-accent/70 px-2 py-1 uppercase tracking-wider">
              Workspaces
            </div>

            <div className="chat-sidebar-item">
              <svg className="w-3.5 h-3.5 text-accent stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <span>My Chats</span>
            </div>

            <div className="chat-sidebar-item">
              <svg className="w-3.5 h-3.5 text-accent stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <span>Project 1</span>
            </div>

            <div className="chat-sidebar-item chat-sidebar-item-active justify-between mt-2">
              <span className="truncate">Greeting Inquiry</span>
              <span className="text-xs opacity-75">•••</span>
            </div>
          </div>

          <div className="px-2 py-1 text-[11px] text-accent/70 border-t border-accent/20">
            Local Session
          </div>
        </aside>

        {/* Right Main Chat Area (min-h-0 allows internal scroll) */}
        <section className="flex flex-col flex-1 min-h-0 bg-background/30 justify-between overflow-hidden">
          <div className="text-center py-2 border-b border-accent/15 text-xs font-medium text-accent shrink-0">
            Greeting Inquiry
          </div>

          {/* Messages Scroll Area - Scrollbar Stays STRICTLY Here */}
          <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className="max-w-3xl mx-auto flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-secondary-text">
                    {msg.sender === 'user' ? 'You' : 'Assistant'}
                  </span>
                  {msg.modelTag && (
                    <span className="chat-model-tag">{msg.modelTag}</span>
                  )}
                </div>

                <div className="text-sm text-secondary-text font-normal leading-relaxed pl-1">
                  {msg.text}
                </div>

                {msg.sender === 'assistant' && (
                  <div className="flex items-center gap-1 mt-1 pl-1 text-accent">
                    <button className="chat-icon-btn" title="Regenerate">
                      <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                    </button>
                    <button className="chat-icon-btn" title="Copy">
                      <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v2.25A2.25 2.25 0 0113.5 21.75h-9a2.25 2.25 0 01-2.25-2.25v-9A2.25 2.25 0 014.5 8.25h2.25m3.75-3.75h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9a2.25 2.25 0 012.25-2.25z" />
                      </svg>
                    </button>
                    <button className="chat-icon-btn" title="Edit">
                      <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                      </svg>
                    </button>
                    <button className="chat-icon-btn" title="Delete">
                      <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
            {/* Anchor element to target automatic scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Pinned Input Area */}
          <div className="p-4 max-w-3xl w-full mx-auto shrink-0">
            <div className="chat-input-box">
              <textarea
                rows="2"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleSendMessage}
                placeholder="Type a message and press Enter to send ..."
                className="w-full bg-transparent resize-none text-sm text-secondary-text placeholder:text-accent/60 focus:outline-none"
              />
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  className="chat-icon-btn"
                  title="Attach file"
                >
                  <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.373L8.557 18.315a1.5 1.5 0 11-2.121-2.121l9.879-9.879" />
                  </svg>
                </button>
                <span className="text-[10px] text-accent/50 font-medium">
                  Press Enter to send
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ---------------- 3. BOTTOM SYSTEM STATUS BAR ---------------- */}
      <footer className="chat-statusbar shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-secondary-text flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary-text"></span>
            LM Studio 0.3.2
          </span>
          <div className="flex items-center gap-1">
            <button className="px-2 py-0.5 rounded text-[10px] font-semibold bg-secondary-text text-background">
              User
            </button>
            <button className="px-2 py-0.5 rounded text-[10px] text-accent hover:text-secondary-text">
              Power User
            </button>
            <button className="px-2 py-0.5 rounded text-[10px] text-accent hover:text-secondary-text">
              Developer
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span>SYSTEM RESOURCES USAGE:</span>
          <span className="px-1.5 py-0.5 rounded bg-accent/15 text-secondary-text font-bold">
            RAM: 2.24 GB
          </span>
          <span className="px-1.5 py-0.5 rounded bg-accent/15 text-secondary-text font-bold">
            CPU: 0.00 %
          </span>
        </div>
      </footer>
    </div>
  )
}

export default LLMChat