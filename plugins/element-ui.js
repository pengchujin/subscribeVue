import Vue from 'vue'
import Element from 'element-ui/lib/element-ui.common'
import locale from 'element-ui/lib/locale/lang/en'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
export default () => {
  Vue.use(Element, { locale })
}
