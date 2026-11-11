import { useEffect, useState } from 'react'

const lines = [
  '<!doctype html>',
  '<html lang="en">',
  '  <body>',
  '    <h1>My Portfolio</h1>',
  '  </body>',
  '</html>',
]
const length = lines.join('\n').length

export function CodeEditor({ label }: { label: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let timer: number | undefined

    function syncMotion() {
      window.clearInterval(timer)
      if (motion.matches) {
        setCount(length)
        return
      }
      let visible = 0
      setCount(visible)
      timer = window.setInterval(() => {
        visible += 1
        setCount(visible)
        if (visible === length) window.clearInterval(timer)
      }, 29)
    }

    syncMotion()
    motion.addEventListener('change', syncMotion)
    return () => {
      window.clearInterval(timer)
      motion.removeEventListener('change', syncMotion)
    }
  }, [])

  let offset = 0
  return (
    <figure className="editor" aria-label={label}>
      <div className="editor-bar">
        <span className="lights" aria-hidden="true"><i /><i /><i /></span>
        <span className="editor-tab">index.html</span>
      </div>
      <pre className="sr-only"><code>{lines.join('\n')}</code></pre>
      <div className="editor-code" aria-hidden="true">
        {lines.map((line, index) => {
          const shown = Math.max(0, Math.min(line.length, count - offset))
          const caret = count >= offset && count <= offset + line.length
          offset += line.length + 1
          let tokenOffset = 0
          return (
            <div className="code-line" key={line}>
              <span className="line-number">{index + 1}</span>
              <span>
                {line.split(/(<[^>]*>)/).map((token, tokenIndex) => {
                  const partial = token.slice(0, Math.max(0, shown - tokenOffset))
                  tokenOffset += token.length
                  return <span key={tokenIndex} className={token.startsWith('<') ? (index === 0 ? 'doctype' : 'tag') : ''}>{partial}</span>
                })}
                {caret && <span className="caret" />}
              </span>
            </div>
          )
        })}
      </div>
    </figure>
  )
}
