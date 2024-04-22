<style scoped lang="scss">
.TabbarHeader {
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: rgb(20 29 41);
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 0 10px rgb(52 81 130);
    // 忽明忽灭动画
    animation: shadowAnimation 3s infinite;

    @keyframes shadowAnimation {
        0% {
            box-shadow: 0 0 10px rgb(52 81 130);
        }
        50% {
            box-shadow: none;
        }
        100% {
            box-shadow: 0 0 10px rgb(52 81 130);
        }
    }

    .TabbarHeaderItem {
        color: rgb(137 141 135);
    }
}

.PullMenu {
    font-family: 'Dingding JinBuTi', Helvetica, Arial, sans-serif !important;
    /* left: calc(100vw - 140px) !important; */
    color: rgb(137 141 135) !important;
}

::v-deep .van-popover__content--vertical {
    background: #2c3b50 !important;
}

::v-deep .van-popover__arrow {
    color: #2c3b50 !important;
    left: 75% !important;
}

.Choose {
    display: block;
    content: '';
    position: absolute;
    bottom: 7px;
    left: -200px;
    width: 3rem;
    height: 3px;
    border-radius: 1px;
    background-color: #1989fa;
    /* 颜色渐变动画 */
    animation: colorAnimation 3s infinite;

    /* 添加轻微光效阴影 */
    @keyframes colorAnimation {
        0% {
            background-color: #1989fa;
            box-shadow: 0 0 10px #1989fa;
        }

        50% {
            background-color: #f56c6c;
            /* box-shadow: 0 0 10px #f56c6c; */
        }

        100% {
            background-color: #1989fa;
            box-shadow: 0 0 10px #1989fa;
        }
    }

    /* 添加移动动画 */
    transition: left 0.5s;

}
</style>
<template>
    <div class="TabbarHeader">
        <router-link to="/" class="TabbarHeaderItem" @click="chooseTab(0)">
            <van-icon name="wap-home" />
            <span>首页</span>
        </router-link>
        <router-link to="/statistics" class="TabbarHeaderItem" @click="chooseTab(1)">
            <van-icon name="video" />
            <span>统计</span>
        </router-link>
        <router-link to="/schedule" class="TabbarHeaderItem" @click="chooseTab(2)">
            <van-icon name="todo-list" />
            <span>日程</span>
        </router-link>
        <router-link to="/about" class="TabbarHeaderItem" @click="chooseTab(3)">
            <van-icon name="notes" />
            <span>关于</span>
        </router-link>
        <div class="TabbarHeaderItem more">
            <van-popover v-model:show="showPopover" theme="dark" :actions="actions" class="PullMenu" @select="onSelect">
                <template #reference>
                    <van-icon name="wap-nav" />
                    <span style="user-select:none;">更多</span>
                </template>
            </van-popover>
        </div>
        <div class="Choose"></div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {

    },
    watch: {
        // 监听路由变化初始化Choose的位置
        '$route': 'onRouteChange'
    }
})
export default class Tabbar extends Vue {
    showPopover = false;
    actions = [
        // { text: '猫的衣柜', value: '/more/NewClothe' },
        { text: '上传新衣', value: '/more/MakingClothe' },
        { text: '用户信息', value: '/more/My' },
        { text: '友情链接', value: '/more/Blogroll' },
        { text: '退出登录', value: '/more/Login' },
    ];
    public onSelect(action: any) {
        if (action.value !== '/more/Login') {
            this.$router.push(action.value)
            return
        } else {
            // 退出登录
            // 清除cookie
            document.cookie = 'cookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
            // 清除localStorage
            localStorage.removeItem('userInfo')
            // 清除sessionStorage
            sessionStorage.removeItem('userInfo')
            // 跳转到登录页
            this.$router.push('/login')
        }
    }
    // 选择TabbarHeaderItem
    public chooseTab(e: any) {

        // 获取对应的TabbarHeaderItem的第一个子元素的offsetLeft
        var left = (document.getElementsByClassName('TabbarHeaderItem')[e].children[0] as HTMLElement).offsetLeft
        // 修改Choose的left值,要有动画效果
        var choose = document.getElementsByClassName('Choose')[0] as HTMLElement
        choose.style.display = 'block'
        choose.style.left = left + 'px'
    }
    public mounted() {
        this.onRouteChange(this.$route);
        // 初始化padding
        var TabbarHeader = document.getElementsByClassName('TabbarHeader')[0] as HTMLElement
        if (this.$store.state.windowWidth > 900) {
            TabbarHeader.style.padding = '0 16rem'
        } else if (this.$store.state.windowWidth > 768) {
            TabbarHeader.style.padding = '0 10rem'
        } else if (this.$store.state.windowWidth > 650) {
            TabbarHeader.style.padding = '0 8rem'
        } else if (this.$store.state.windowWidth > 480) {
            TabbarHeader.style.padding = '0 6rem'
        } else if (this.$store.state.windowWidth > 320) {
            TabbarHeader.style.padding = '0 4rem'
        } else {
            TabbarHeader.style.padding = '0 2rem'
        }
    }

    public onRouteChange(newRoute: any) {
        // 根据路由初始化Choose的位置
        switch (newRoute.path) {
            case '/':
                this.chooseTab(0);
                break;
            case '/statistics':
                this.chooseTab(1);
                break;
            case '/schedule':
                this.chooseTab(2);
                break;
            case '/about':
                this.chooseTab(3);
                break;
            default:
                var choose = document.getElementsByClassName('Choose')[0] as HTMLElement
                choose.style.display = 'none'
                break;
        }
    }
    // 监听窗口宽度变化,响应式调整图片数量
    created() {
        this.$store.watch(() => this.$store.state.windowWidth, (newVal) => {
            // .TabbarHeader间距线性缩短padding
            var TabbarHeader = document.getElementsByClassName('TabbarHeader')[0] as HTMLElement
            if (newVal > 900) {
                TabbarHeader.style.padding = '0 16rem'
            } else if (newVal > 768) {
                TabbarHeader.style.padding = '0 10rem'
            } else if (newVal > 650) {
                TabbarHeader.style.padding = '0 8rem'
            } else if (newVal > 480) {
                TabbarHeader.style.padding = '0 6rem'
            } else if (newVal > 320) {
                TabbarHeader.style.padding = '0 4rem'
            } else {
                TabbarHeader.style.padding = '0 2rem'
            }
            this.onRouteChange(this.$route)

        })
    }
}
</script>
