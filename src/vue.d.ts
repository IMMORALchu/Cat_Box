// vuex.d.ts
import { ComponentCustomProperties } from '@/vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
windowWidth: number
[x: string]: number
    orbital
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
