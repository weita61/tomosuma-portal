'use client'
import { useState } from 'react'

const execs = [
  { key: 'nonogaki', name: '野々垣 友祐', dept: 'テクノロジー部', color: '#185FA5', sec: '森川 あおい' },
  { key: 'akiyama',  name: '秋山 たかひで', dept: '顧問・渉外・営業', color: '#993C1D', sec: '田中 りょう' },
  { key: 'omagari',  name: '大曲 弘太朗', dept: 'SNSディレクター', color: '#854F0B', sec: '松下 ゆい' },
]

export default function ExecPage() {
  const [active, setActive] = useState('nonogaki')
  const [input, setInput] = useState('')
  const [chats, setChats] = useState<Record<string, {from:string, text:string}[]>>({
    nonogaki: [{ from: 'sec', text: '野々垣さん、おはようございます！本日のテクノロジー部MTGは19:00からです。中田さんからデバイス要件の相談が来ています。' }],
    akiyama:  [{ from: 'sec', text: '秋山さん、おはようございます！本日は企業渉外のアポが2件入っています。提案資料の確認をお願いできますか？' }],
    omagari:  [{ from: 'sec', text: '大曲さん、おはようございます！〇〇 with smileの企画骨格が代表から共有されました。今日中に松田さん・坂本さんに展開しますか？' }],
  })

  const current = execs.find(e => e.key === active)!

  const sendMsg = () => {
    if (!input.trim()) return
    setChats(prev => ({
      ...prev,
      [active]: [...prev[active], { from: 'exec', text: input }]
    }))
    const msg = input
    setInput('')
    setTimeout(() => {
      setChats(prev => ({
        ...prev,
        [active]: [...prev[active], { from: 'sec', text: `承知しました！「${msg}」、すぐ対応します🙏` }]
      }))
    }, 700)
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      {/* 幹部切り替え */}
      <div style={{ width: '200px', background: '#f5f5f5', padding: '16px', borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#534AB7', marginBottom: '12px' }}>TomoSma 幹部</div>
        {execs.map(e => (
          <button key={e.key} onClick={() => setActive(e.key)} style={{
            padding: '10px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', textAlign: 'left',
            background: active === e.key ? e.color : 'transparent',
            color: active === e.key ? '#fff' : '#333',
            fontWeight: active === e.key ? '600' : '400',
            fontSize: '12px',
          }}>
            <div>{e.name}</div>
            <div style={{ fontSize: '10px', opacity: .75, marginTop: '2px' }}>{e.dept}</div>
          </button>
        ))}
      </div>

      {/* メインエリア */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: current.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600' }}>
            {current.name[0]}
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '500' }}>{current.name}</div>
            <div style={{ fontSize: '10px', color: '#888' }}>秘書：{current.sec}</div>
          </div>
        </div>

        {/* チャット */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {chats[active].map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'exec' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '75%', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', lineHeight: '1.65',
                background: msg.from === 'exec' ? current.color : '#f0f0f0',
                color: msg.from === 'exec' ? '#fff' : '#333',
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* 入力 */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid #eee', display: 'flex', gap: '8px' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMsg()}
            placeholder={`${current.sec}に送る...`}
            style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '12px', outline: 'none' }}
          />
          <button onClick={sendMsg} style={{ padding: '8px 16px', background: current.color, color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>
            送信
          </button>
        </div>
      </div>
    </div>
  )
}
