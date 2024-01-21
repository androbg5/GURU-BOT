import { cpus as _cpus, totalmem, freemem } from 'os'
import util from 'util'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
let format = sizeFormatter({
  std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})
let handler = async (m, { conn, usedPrefix, command }) => {
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) //groups.filter(v => !v.read_only)
  const used = process.memoryUsage()
  const cpus = _cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
    return cpu
  })
  const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total
    last.speed += cpu.speed / length
    last.times.user += cpu.times.user
    last.times.nice += cpu.times.nice
    last.times.sys += cpu.times.sys
    last.times.idle += cpu.times.idle
    last.times.irq += cpu.times.irq
    return last
  }, {
    speed: 0,
    total: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  })
  let old = performance.now()
  
  let neww = performance.now()
  let speed = neww - old
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './Guru.jpg')
let user = global.db.data.users[who]
  
let infobt = `*𝘏𝘐 𝘉𝘙𝘖 𝘞𝘌𝘓𝘊𝘖𝘔𝘌 👋*

༆ 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 *:*
 _AndroBot-MD_
༆ 𝗘𝗺𝗮𝗶𝗹 *:* 
_laabdariimad@gmail.com_
༆ 𝗢𝘄𝗻𝗲𝗿 𝗡𝗮𝗺𝗲 *:*
_ImadTech_

*➪* 𝗕𝗢𝗧 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 *☕︎*

● *𝘋𝘖𝘞𝘕𝘓𝘖𝘈𝘋* ● 

• .modapk
• .fb
• .ig
• .ytv
• .yta

● *𝘊𝘏𝘈𝘛𝘎𝘗𝘛 / 𝘈𝘐* ●

• .imagine
• .dalle
• .ai
• .bard
• .toanime

● *𝘖𝘛𝘏𝘌𝘙 / 𝘚𝘛𝘐𝘊𝘒𝘌𝘙* ●

• .math
• .hdr
• .play
• .runtime
• .owner
• .wm
• .sticker

>> *𝘖𝘧𝘤 𝘖𝘸𝘯𝘦𝘳 𝘕𝘶𝘮𝘣𝘦𝘳 _:_*
> _+212770131076_
>> *𝘖𝘧𝘤 𝘛𝘦𝘭𝘦𝘨𝘳𝘢𝘮 𝘊𝘢𝘯𝘢𝘭 _:_*
> _t.me/MrAndroTech_
>> *𝘖𝘧𝘤 𝘚𝘶𝘱𝘱𝘰𝘳𝘵 𝘕𝘶𝘮𝘣𝘦𝘳 _:_*
> _+212657971184_
>> *𝘖𝘧𝘤 𝘉𝘰𝘵 𝘕𝘶𝘮𝘣𝘦𝘳 _:_*
> _+212697573024_
└──────────────!`
conn.sendFile(m.chat, pp, 'prefil.jpg', infobt, m, false, { mentions: [who] })
m.react(done)

}
handler.help = ['info']
handler.tags = ['main']
handler.command = ['info', 'menu', 'mu']

export default handler
