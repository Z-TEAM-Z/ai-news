import { defineComponent, h } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

const Layout = defineComponent({
  setup(_props, { slots }) {
    const route = useRoute()
    return () =>
      h(
        DefaultTheme.Layout,
        { class: route.path.includes('/course') ? 'course-layout' : undefined },
        slots,
      )
  },
})

export default {
  extends: DefaultTheme,
  Layout,
}
