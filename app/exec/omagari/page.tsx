'use client'
import { useState, useEffect, useRef } from 'react'

const EXEC = { name: '大曲 弘太朗', dept: 'SNSディレクター', color: '#854F0B', sec: '松下 ゆい' }

export default function OmagariPage() {
  const [messages, setMessages] = useState([
    { from: 'sec', text: "大曲さん、おはようございます！〇〇 with smileの企画骨格が代表から共有されました。今日中に松田さん・坂本さんに展開しますか？" },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMsg = () => {
    if (!input.trim()) return
    const msg = input
    setMessages(prev => [...prev, { from: 'exec', text: msg }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'sec', text: '承知しました。すぐ対応します🙏' }])
    }, 800)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '10px', background: '#fff' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: EXEC.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600' }}>大</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: '600' }}>{EXEC.name}</div>
          <div style={{ fontSize: '10px', color: '#888' }}>{EXEC.dept}</div>
        </div>
        <div style={{ fontSize: '11px', color: '#fff', background: EXEC.color, padding: '4px 10px', borderRadius: '12px' }}>秘書：{EXEC.sec}</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', background: '#fafafa' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'exec' ? 'flex-end' : 'flex-start', gap: '8px', alignItems: 'flex-end' }}>
            {msg.from === 'sec' && (
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#993556', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', flexShrink: 0 }}>松</div>
            )}
            <div style={{ maxWidth: '72%', padding: '10px 14px', borderRadius: msg.from === 'exec' ? '12px 4px 12px 12px' : '4px 12px 12px 12px', fontSize: '12px', lineHeight: '1.7', background: msg.from === 'exec' ? EXEC.color : '#fff', color: msg.from === 'exec' ? '#fff' : '#333', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: '12px 16px', borderTop: '1px solid #eee', display: 'flex', gap: '8px', background: '#fff' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} placeholder="松下に送る..." style={{ flex: 1, padding: '10px 14px', borderRadius: '20px', border: '1px solid #ddd', fontSize: '12px', outline: 'none', background: '#f5f5f5' }} />
        <button onClick={sendMsg} style={{ width: '40px', height: '40px', borderRadius: '50%', background: EXEC.color, color: '#fff', border: 'none', cursor: 'pointer', fontSize: '16px' }}>↑</button>
      </div>
    </div>
  )
}
