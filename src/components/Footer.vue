<style scoped lang="scss">
.Footer {
    position: fixed;
    bottom: 24px;
    left: 0;
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #fff;
    z-index: 1;
}
</style>
<template>
    <div class="Footer">
        <!-- 基于VUE3+TS -->
        <div>
            {{ text }}
        </div>
        <div>
            Powered by VUE3+TS ©2024-{{ new Date().getFullYear() }}
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
@Options({
    components: {
    }
})
export default class Footer extends Vue {
    text: any;
    data() {
        return {
            text: '至此以后,杀死幻想'
        };
    }
    created() {
        // 获取一言
        axios.get('https://v1.hitokoto.cn/?encode=text&max_length=10&c=d&c=h&c=i&c=j&c=k')
            .then(({ data }) => {
                this.text = data
            })
            .catch(console.error)
    }
}
</script>
