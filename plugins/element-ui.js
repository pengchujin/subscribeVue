import Vue from 'vue'
import Element from 'element-ui/lib/element-ui.common'
import locale from 'element-ui/lib/locale/lang/en'
import VueClipboard from 'vue-clipboard2'
import VueQrcode from '@xkeshi/vue-qrcode';

export default () => {
  Vue.use(VueClipboard)
  Vue.component(VueQrcode.name, VueQrcode);
  Vue.use(Element, { locale })
}
