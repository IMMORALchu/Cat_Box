<style scoped lang="scss">
.Box {
    min-height: 20vh;
    min-width: 20vw;
    max-width: 80vw;
    border: 1px solid rgb(11, 16, 22);
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
    /* 居中 */
    margin: 0 auto;
    background: rgb(20, 29, 41);
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 1rem;
}

.Box-Head {
    padding: 1rem;
    /* 左边对齐 */
    text-align: left;
    font-size: 1.2rem;
}

.Box-Body {
    padding: 1rem;
}

::v-deep .van-cell,
::v-deep .van-cell:hover,
::v-deep .van-collapse-item__content,
::v-deep .van-hairline--top-bottom:after,
::v-deep .van-hairline-unset--top-bottom:after {
    background: none;
    border: none;
}
</style>
<template>
    <div class="Box">
        <div class="Box-Head">
            <slot name="head"></slot>
        </div>
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin: '0 0' }" />
        <div class="Box-Body">
            <slot name="body"></slot>
        </div>
        <div class="Box-Foot" v-if="footer">
            <van-collapse v-model="activeNames">
                <van-collapse-item name="1">
                    <slot name="foot"></slot>
                </van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
    components: {
    },
    props: {
        footer: {
            type: Boolean,
            default: false
        }
    }
})
export default class Box extends Vue {

    activeNames = [];
    footer: any;
    data() {
        return {
        };
    }
}
</script>
