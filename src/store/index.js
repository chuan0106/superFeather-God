import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  cartList: []
}
// 各司其职
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
