<style scoped lang="scss">
.BoxBodyItem {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .BoxBodyItemLeft {
        font-size: 1.2rem;
        /* 给固定宽度 */
        width: 3rem !important;
    }
}

::v-deep .van-grid-item__content {
    background: none !important;
}

.BoxBodyCollapse {
    ::v-deep .van-cell {
        font-size: 1.3rem !important;
        color: #6e63d4;
    }
}

.BoxBodyItem {
    .BoxBodyItemRightTitle, .BoxBodyItemRightMsg {
        /* 文字靠左 */
        text-align: left;
    }

    ::v-deep .van-cell__title {
        color: #5ddabf;
    }

    ::v-deep .van-cell:after {
        width: 10rem !important;
        margin: 0 auto !important;
        /* 虚线 */
        border-bottom: 2px solid #63378c;
    }
}

</style>
<template>
    <div>
        <h1>Stats</h1>
        <box>
            <template #head>
                <div>时间分类</div>
            </template>
            <template #body>
                <van-collapse v-model="activeNames" class="BoxBodyCollapse">
                    <van-collapse-item :name="index" :title="item['year'] + '年'" v-for="(item, index) in ClotheList"
                        :key="index">
                        <van-collapse v-model="monthActiveNames">
                            <van-collapse-item :name="indexM" :title="itemM['month'].replace(/^0/, '') + '月'"
                                class="BoxBodyItem" v-for="(itemM, indexM) in item['month']" :key="indexM">
                                <div class="BoxBodyItemRight" v-for="(itemD, indexD) in itemM['data']" :key="indexD">
                                    <div class="BoxBodyItemRightTitle">{{ itemD['day'].replace(/^0/, '') + '号 ' +
                                        itemD['create_time'].split(' ')[1] }}</div>
                                        <div class="BoxBodyItemRightMsg">
                                            {{ itemD['title'] }}
                                        </div>
                                    <van-grid :border="false" :column-num="imgCount">
                                        <van-grid-item v-for="(itemI, indexI) in itemD['image_list']" :key="indexI"
                                            @click="showPreview(itemI)">
                                            <van-image lazy-load :src="itemI" fit="cover" height="100%" width="100%"
                                                radius="0.5rem" />
                                        </van-grid-item>
                                    </van-grid>
                                </div>
                            </van-collapse-item>
                        </van-collapse>
                    </van-collapse-item>
                </van-collapse>
            </template>
        </box>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// 引入图片预览组件
import { showImagePreview } from 'vant';
import {
    getClotheList
} from '../api/api';
import Box from '@/components/Box.vue';
@Options({
    components: {
        Box
    }
})

export default class StatisticsView extends Vue {
    activeNames = [];
    ClotheList: any[] = [];
    monthActiveNames: any;
    showImg: boolean = false;
    screenWidth = 0;
    imgCount = 5;
    data() {
        return {
            // 折叠面板激活的面板
            activeNames: [],
            // 月份折叠面板激活的面板
            monthActiveNames: [],
            // 衣服列表
            ClotheList: [],
            // 是否显示图片
            showImg: false,
        };
    }
    public async mounted() {
        // 获取衣服列表
        await getClotheList({
            type: 0,
            page: 1,
            size: 9999,
            id: 0
        }).then((res: any) => {
            this.ClotheList = res.data.data;
        });
        // JSON解析image_list
        this.ClotheList = this.ClotheList.map((item: any) => {
            item.image_list = JSON.parse(item.image_list);
            return item;
        });
        // 按年月分类
        this.ClotheList = this.ClotheList.reduce((prev: any, cur: any) => {
            const yearIndex = prev.findIndex((item: any) => item.year === cur.year);
            if (yearIndex === -1) {
                prev.push({
                    year: cur.year,
                    month: [{
                        month: cur.month,
                        data: [cur]
                    }]
                });
            } else {
                const monthIndex = prev[yearIndex].month.findIndex((item: any) => item.month === cur.month);
                if (monthIndex === -1) {
                    prev[yearIndex].month.push({
                        month: cur.month,
                        data: [cur]
                    });
                } else {
                    prev[yearIndex].month[monthIndex].data.push(cur);
                }
            }
            return prev;
        }, []);

        // 判断是否为pc端
        if (this.$store.state.windowWidth > 900) {
            this.imgCount = 5;
        } else if (this.$store.state.windowWidth > 768) {
            this.imgCount = 4;
        } else if (this.$store.state.windowWidth > 650) {
            this.imgCount = 3;
        } else {
            this.imgCount = 2;
        }
    }
    // 点击预览
    public showPreview(url: any) {
        showImagePreview({
            images: [url],
            startPosition: 0
        });
    }
    // 监听窗口宽度变化,响应式调整图片数量
    created() {
        this.$store.watch(() => this.$store.state.windowWidth, (newVal) => {
            if (newVal > 900) {
                this.imgCount = 5;
            } else if (newVal > 768) {
                this.imgCount = 4;
            } else if (newVal > 650) {
                this.imgCount = 3;
            } else {
                this.imgCount = 2;
            }
        })
    }
}
</script>
