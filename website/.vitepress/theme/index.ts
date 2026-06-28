import { defineComponent, h, onMounted, ref } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { SupportTopBar } from './support-cta'
import './custom.css'

const DesktopSupportTopBar = defineComponent({
  setup() {
    const show = ref(false)

    onMounted(() => {
      const mq = window.matchMedia('(min-width: 960px)')
      const update = () => {
        show.value = mq.matches
      }
      update()
      mq.addEventListener('change', update)
    })

    return () => (show.value ? h(SupportTopBar) : null)
  },
})

const Layout = defineComponent({
  setup(_props, { slots }) {
    const route = useRoute()
    const layoutClass = [
      'site-top-bar-layout',
      route.path === '/' || route.path === '/index.html' ? 'home-layout' : '',
      route.path.includes('/course') ? 'course-layout' : '',
      route.path.includes('/about') ? 'about-layout' : '',
    ]
      .filter(Boolean)
      .join(' ')
    return () =>
      h(
        DefaultTheme.Layout,
        {
          class: layoutClass,
        },
        {
          ...slots,
          'layout-top': () => h(DesktopSupportTopBar),
        },
      )
  },
})

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ router }) {
    if (typeof document === 'undefined') return
    const unlockScroll = () => {
      document.body.style.removeProperty('overflow')
      document.body.style.removeProperty('padding-right')
    }
    router.onAfterRouteChange = unlockScroll
    window.addEventListener('pageshow', unlockScroll)
  },
}
