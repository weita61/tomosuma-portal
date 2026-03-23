'use client'
import { useState } from 'react'

const menuItems = [
  { key: 'org',        label: '組織・メンバー',   color: '#534AB7' },
  { key: 'schedule',  label: 'スケジュール',       color: '#185FA5' },
  { key: 'recruit',   label: '採用管理',           color: '#3B6D11' },
  { key: 'device',    label: 'デバイス開発',       color: '#185FA5' },
  { key: 'sns',       label: 'SNS・コンテンツ',    color: '#993C1D' },
  { key: 'event',     label: 'イベント',           color: '#0F6E56' },
  { key: 'governance',label: 'ガバナンス設定',     color: '#5F5E5A' },
  { key: 'training',  label: '研修管理',           color: '#3B6D11' },
]

const replies: Record<string, string> = {
  org:        '現在15名体制です。メンバーの追加・変更を指示してください。',
  schedule:   '今週のスケジュールです。MTGの追加・変更を指示してください。',
  recruit:    '応募19件、スクリーニング中8名です。採用指示を出してください。',
  device:     'Heart-to-Heartデバイスの開発状況です。野々垣チームへ指示できます。',
  sns:        '〇〇 with smileの企画・投稿管理です。大曲チームへ指示できます。',
  event:      '5月イベントの管理です。会場・日程・集客目標を設定してください。',
  governance: 'ガバナンスルールを編集できます。何でも指示してください。',
  training:   '研修①完了済み。研修②は本日19:00予定です。',
}

export default function CeoPage() {
  const [active, setActive] = useState('org')
  const [messages, setMessages] = useState([
    { from: 'office', text: 'おはようございます、渡辺代表。メンバー15名、採用応募19件、本日研修②19:00予定です。何を確認・編集しますか？' }
  ])
  const [input, setInput] = useState('')

  const handleMenu = (key: string) => {
    setActive(key)
    setMessages([{ from: 'office', text: replies[key] }])
  }

  const sendMsg = () => {
    if (!input.trim()) return
    const userMsg = { from: 'ceo', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, {
        from: 'office',
        text: `「${input}」を受け取りました。山田・担当幹部に連携して対応します✅`
      }])
    }, 700)
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ width: '200px', background: '#f5f5f5', padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px', borderRight: '1px solid #eee' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#534AB7', marginBottom: '12px' }}>TomoSma CEO</div>
        {menuItems.map(item => (
          <button key={item.key} onClick={() => handleMenu(item.key)} style={{
            padding: '8px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '12px',
            fontWeight: active === item.key ? '600' : '400',
            background: active === item.key ? item.color : 'transparent',
            color: active === item.key ? '#fff' : '#333',
          }}>
            {item.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: '500' }}>
          {menuItems.find(m => m.key === active)?.label}
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'ceo' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '75%', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', lineHeight: '1.65',
                background: msg.from === 'ceo' ? '#534AB7' : '#f0f0f0',
                color: msg.from === 'ceo' ? '#fff' : '#333',
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #eee', display: 'flex', gap: '8px' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMsg()}
            placeholder="オフィスに指示を出す..."
            style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '12px', outline: 'none' }}
          />
          <button onClick={sendMsg} style={{ padding: '8px 16px', background: '#534AB7', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>
            送信
          </button>
        </div>
      </div>
    </div>
  )
}
