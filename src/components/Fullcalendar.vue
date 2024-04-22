<style scoped lang="scss">
.F_body {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 2rem;
    min-height: 50vh;
    /* 半透明毛玻璃类型 */
    background-color: rgba(115, 99, 159, 0.2);
    backdrop-filter: blur(9px);
    -webkit-backdrop-filter: blur(9px);
    border: 0.8px solid rgba(255, 255, 255, 0.18);
    box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    border-radius: 9px;
    -webkit-border-radius: 9px;
    color: rgba(255, 255, 255, 0.6);
    border-radius: 10px;
    /* 文字靠左 */
    text-align: left;
    padding: 1rem;

    .Fb_top {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #5d8ada;
    }


    .Fb_bottom_content_title {
        margin-bottom: 0.5rem;
    }

    .Fb_bottom_content_item {
        display: flex;
        flex-wrap: wrap;

        .Fb_bottom_content_item_box {
            width: calc(100%);
            min-height: 5rem;
            padding: 0.5rem;
            border: 1px solid #5f7285;
            border-radius: 5px;
            margin-bottom: 0.5rem;
            margin-right: 0.5rem;
            position: relative;

            background-color: rgba(115, 99, 159, 0.2);
            backdrop-filter: blur(9px);
            -webkit-backdrop-filter: blur(9px);
            border: 0.8px solid rgba(255, 255, 255, 0.18);
            box-shadow: rgba(78, 128, 167, 0.3) 3px 2px 4px 1px;
            border-radius: 9px;
            -webkit-border-radius: 9px;

            /* 日期定位在左上角 */
            .Fb_bottom_content_item_date {
                position: absolute;
                top: 0;
                left: 0;
                color: #fff;
                padding: 0.2rem 0.5rem;
                border-radius: 5px;
                font-size: 0.7rem;
            }

            /* 标题定位在左下角 */
            .Fb_bottom_content_item_title {
                position: absolute;
                bottom: 0;
                left: 0;
                color: #fff;
                padding: 0.2rem 0.5rem;
                border-radius: 5px;
                font-size: 1rem;
            }

            /* 分类定位在右上角 */
            .Fb_bottom_content_item_sort {
                position: absolute;
                top: 0;
                right: 0;
                color: #fff;
                padding: 0.2rem 0.5rem;
                border-radius: 5px;
                font-size: 0.9rem;
            }
        }

    }
}
</style>
<template>
    <div class="F_body">
        <div class="Fb_top">
            已收录100场日程
        </div>
        <div class="Fb_bottom">
            <div class="Fb_bottom_content" v-for="index in scheduleList">
                <div class="Fb_bottom_content_title">
                    {{ index.year }}年第{{ index.week }}周
                </div>
                <div class="Fb_bottom_content_item">
                    <div class="Fb_bottom_content_item_box" v-for="indexD in index.events"
                        :style="{ background: 'rgba(' + indexD.color + ', 0.5)' }">
                        <div class="Fb_bottom_content_item_date">
                            {{ indexD.date.split('-')[1] }}/{{ indexD.date.split('-')[2].substring(0, 2) }}日 {{ new
                                Date(indexD.date).toLocaleDateString('zh-CN', { weekday: 'long' }) }} {{ new
                                Date(indexD.date).getHours() < 12 ? 'AM' : 'PM' }}{{ indexD.date.split(' ')[1].substring(0, 5) }}
                        </div>
                        <div class="Fb_bottom_content_item_title">
                            {{ indexD.title }}
                        </div>
                        <div class="Fb_bottom_content_item_sort">
                            {{ indexD.type }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {
    getSchedule
} from '../api/api';
@Options({
    components: {
    },
})
export default class Fullcalendar extends Vue {
    scheduleList: any = [];
    public dynamicWidth(width: number) {
        var Fb_bottom_content_item_box = document.getElementsByClassName('Fb_bottom_content_item_box') as HTMLCollectionOf<HTMLElement>;
        if (width < 1000) {
            for (let i = 0; i < Fb_bottom_content_item_box.length; i++) {
                Fb_bottom_content_item_box[i].style.width = '100%';
            }
        } else {
            for (let i = 0; i < Fb_bottom_content_item_box.length; i++) {
                Fb_bottom_content_item_box[i].style.width = 'calc(14% - 0.5rem)';
            }
        }
    }
    async mounted(): Promise<void> {
        await getSchedule().then((res) => {
            res.data.data.forEach((item: any) => {
                item.events = JSON.parse(item.events);
                item.events.forEach((itemD: any) => {
                    if (itemD.type === 'rest') {
                        itemD.type = '休息';
                        itemD.color = '152, 152, 152';
                    } else if (itemD.type === 'game') {
                        itemD.type = '游戏';
                        itemD.color = '102, 51, 102';
                    } else if (itemD.type === 'sub') {
                        itemD.type = '投稿';
                        itemD.color = '153, 102, 153';
                    } else if (itemD.type === 'watch') {
                        itemD.type = '观影';
                        itemD.color = '153, 153, 204';
                    } else if (itemD.type === 'radio') {
                        itemD.type = '电台';
                        itemD.color = '204, 204, 255';
                    } else if (itemD.type === 'fitness') {
                        itemD.type = '健身';
                        itemD.color = '255, 153, 51';
                    } else if (itemD.type === 'collab') {
                        itemD.type = '联动';
                        itemD.color = '102, 51, 102';
                    } else if (itemD.type === 'special') {
                        itemD.type = '特别';
                        itemD.color = '204, 204, 0';
                    } else if (itemD.type === 'chat') {
                        itemD.type = '杂谈';
                        itemD.color = '204, 153, 204';
                    }
                });
            });
            this.scheduleList = res.data.data;
        }).catch((err) => {
            console.log(err);
        })
        this.dynamicWidth(this.$store.state.windowWidth);
    }
    // 监听窗口宽度变化
    created() {
        this.$store.watch(() => this.$store.state.windowWidth, (newVal) => {
            this.dynamicWidth(newVal);
        })
    }
}
</script>
