import { defineConfig } from 'vitepress'
import newsSidebar from './sidebar.generated.mjs'
import courseSidebar from './sidebar.course.mjs'

export default defineConfig({
  title: 'AI-NEWS',
  description: '每日 AI 模型、产品、论文、行业动态 — 联网检索 · 来源核验 · 系统教程',
  lang: 'zh-CN',
  base: '/ai-news/',
  cleanUrls: true,
  lastUpdated: true,
  head: [['meta', { name: 'theme-color', content: '#f5f5f7' }]],
  themeConfig: {
    siteTitle: 'AI-NEWS',
    notFound: {
      title: '页面不存在',
      quote: '该页面不存在或链接已失效。',
      linkLabel: '返回首页',
      linkText: '返回首页',
    },
    nav: [
      { text: '首页', link: '/' },
      { text: 'AI资讯', link: '/news/' },
      { text: '教程', link: '/course/' },
    ],
    sidebar: {
      '/news/': newsSidebar,
      '/course/': courseSidebar,
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Z-TEAM-Z/ai-news',
      },
    ],
    search: {
      provider: 'local',
    },
    outline: {
      level: [2, 2],
      label: '章节索引',
    },
    footer: {
      message: '内容由 ai-info-research 检索生成 · 请结合原文链接核验',
      copyright: 'AI News · LLM 应用工程教程',
    },
  },
})
