'use client'

import { useEffect } from 'react'
import tocbot from 'tocbot'

export const Toc = () => {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.content',
      headingSelector: 'h2, h3',
      scrollSmoothOffset: -100,
      headingsOffset: 100,
    })

    // 不要となったtocbotインスタンスを削除
    return () => tocbot.destroy()
  }, [])

  return <nav className="toc " />
}
