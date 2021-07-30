import nav from './nav.vue'
import popup from './popup.vue'
import Vue from 'vue'

export default {
    install() {
        Vue.component(nav.name, nav)
        Vue.component(popup.name, popup)
    }
}