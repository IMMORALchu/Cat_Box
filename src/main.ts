import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant的触摸事件模拟器
import '@vant/touch-emulator';

// 引入字体
import './style/font/font.css'

// 引入VANT
import { 
    Button,
    Icon,
    Toast,
    Tab,
    Tabs,
    Popover,
    Divider,
    Collapse,
    CollapseItem,
    Grid,
    GridItem,
    Image as VanImage,
    Lazyload,
    Uploader,
    Field,
    CellGroup,
    Switch 
} from 'vant';
import 'vant/lib/index.css';

createApp(App)
.use(store)
.use(router)
.use(Button)
.use(Icon)
.use(Toast)
.use(Tab)
.use(Tabs)
.use(Popover)
.use(Divider)
.use(Collapse)
.use(CollapseItem)
.use(Grid)
.use(GridItem)
.use(VanImage)
.use(Lazyload)
.use(Uploader)
.use(Field)
.use(CellGroup)
.use(Switch)
.mount('#app')
