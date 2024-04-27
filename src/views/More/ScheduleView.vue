<style scoped lang="scss">
.Schedule {
    .F_body {
        width: 100%;
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

            ::v-deep .el-select {
                margin-left: 1rem;
            }

            ::v-deep .el-select__wrapper {
                background-color: #355575;
            }

            :global(.el-popper) {
                background: #2c3b50 !important;
                border: #2c3b50 !important;
                font-family: "DancingScript-Bold" !important;
            }

            :global(.el-popper__arrow::before) {
                background: #2c3b50 !important;
                border: #2c3b50 !important;
            }

            :global(.el-select__selection .el-tag) {
                background: #2c3b50 !important;
                border: #2c3b50 !important;
            }

            :global(.el-select-dropdown__item.is-hovering) {
                background: #3c5c8d !important;
            }

            :global(.el-select-dropdown__item) {
                color: #cec3ed !important;
            }

            :global(.el-button.is-text:not(.is-disabled).is-has-bg) {
                background: #8373cc !important;
                color: #cec3ed !important;
            }

            :global(.el-input__wrapper) {
                background: none;
                margin-bottom: 0.5rem;
            }

            :global(.el-textarea__inner) {
                background: none !important;
                color: #cec3ed !important;
                border-bottom: 1px solid #5f7285 !important;
                border-radius: 0 !important;
                box-shadow: none !important;
                margin-bottom: 1rem;
            }

            :global(.el-select__placeholder) {
                color: #50b7c0;
            }

            :global(.is-disabled) {
                color: #1f033d !important;
            }
        }

        .Fb_bottom_content_title {
            margin-bottom: 0.5rem;
            padding: 0.5rem 1rem;

            .deleteWeek {
                position: relative;
                top: -0.2rem;
                /* 定位在父元素最右边 */
                float: right;
                background-color: #f56c6c;
                color: #fff;
                border: none;
                margin-left: 1rem;
            }

            .saveWeek {
                position: relative;
                top: -0.2rem;
                /* 定位在父元素最右边 */
                float: right;
                background-color: #d6e277;
                color: #fff;
                border: none;
            }
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
}

:global(.el-drawer) {
    --el-drawer-bg-color: #152032;
}

:global(.van-cell),
:global(.van-cell-group) {
    background-color: #6e546f;
}

:global(.el-select__wrapper) {
    background: none;
    box-shadow: none;
}

:global(.el-select__wrapper.is-hovering:not(.is-focused)),
:global(.el-select__wrapper.is-focused) {
    box-shadow: none;
}

:global(.el-date-editor.el-input) {
    width: 90%;
    margin-bottom: 10px;
}

:global(.el-input__inner) {
    color: #5cc0a8;
}

:global(.el-time-spinner__item.is-active:not(.is-disabled)) {
    color: #7b9cdf;
}

::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
}
</style>
<template>
    <div class="Schedule">
        <h1>Schedule</h1>
        <box>
            <template #head>
                <div>上传日程</div>
            </template>
            <template #body>
                <div class="F_body">
                    <div class="Fb_top">
                        <el-button type="info" @click="addSchedule">添加日程</el-button>
                        <el-select v-model="value" placeholder="选择时间" size="large" style="width: 240px">
                            <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value"
                                :disabled="item.disabled" />
                        </el-select>
                    </div>
                    <div class="Fb_bottom">
                        <div class="Fb_bottom_content" v-for="index in scheduleList">
                            <div class="Fb_bottom_content_title">
                                {{ index.year }}年第{{ index.week }}周
                                <el-button type="success" class="deleteWeek"
                                    @click="deleteSchedule(index.year, index.week)">删除</el-button>
                                <el-button type="success" class="saveWeek"
                                    @click="saveSchedule(index.year, index.week)">保存</el-button>
                            </div>
                            <div class="Fb_bottom_content_item">
                                <div class="Fb_bottom_content_item_box" v-for="indexD in index.events"
                                    :style="{ background: indexD.color }" @click="editSchedule(indexD.date)">
                                    <div class="Fb_bottom_content_item_date">
                                        {{ indexD.date.split("-")[1] }}/{{
                                            indexD.date.split("-")[2].substring(0, 2)
                                        }}日
                                        {{
                                            new Date(indexD.date).toLocaleDateString("zh-CN", {
                                                weekday: "long",
                                            })
                                        }}
                                        {{ new Date(indexD.date).getHours() < 12 ? "AM" : "PM" }}{{ indexD.date.split(" ")[1].substring(0, 5) }}
                                    </div>
                                    <div class=" Fb_bottom_content_item_title">
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
        </box>
        <el-drawer v-model="dialog" :title="drawerTitle" :direction="direction">
            <van-cell-group inset>
                <van-field v-model="drawerText" label="文本" placeholder="请输入标题" />
                <el-select v-model="drawerSortValue" placeholder="请选择类型" size="large" style="width: 100%">
                    <el-option v-for="item in sortOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-time-picker v-model="timePicker" arrow-control placeholder="Arbitrary time" />
                <div style="margin-bottom: 10px;">
                    <span>请选择背景颜色</span>
                    <el-color-picker v-model="color" show-alpha />
                </div>
                <el-button type="primary" @click="drawerVerify">确认</el-button>
            </van-cell-group>
        </el-drawer>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Box from "@/components/Box.vue";
import { ElMessage } from "element-plus";
import {
    postSchedule,
    getSchedule
} from "@/api/api";
@Options({ components: { Box } })
export default class ScheduleView extends Vue {
    value = "";
    drawerSortValue = "";
    drawerText = "";
    timePicker = "";
    option: any[] = [];
    scheduleList: any[] = [];
    direction: string = "rtl";
    color: string = "#ff0000";
    sortOptions: any[] = [
        {
            value: 'chat',
            label: '杂谈',
        },
        {
            value: 'rest',
            label: '休息',
        },
        {
            value: 'game',
            label: '游戏',
        },
        {
            value: 'sub',
            label: '投稿',
        },
        {
            value: 'watch',
            label: '观影',
        },
        {
            value: 'radio',
            label: '电台',
        },
        {
            value: 'fitness',
            label: '健身',
        },
        {
            value: 'collab',
            label: '联动',
        },
        {
            value: 'special',
            label: '特别',
        }
    ];
    dialog: boolean = false;
    drawerTitle = "";
    data() {
        return {};
    }
    // 增加日程列表 
    public addSchedule() {
        if (this.value == "") {
            ElMessage.error("请选择时间");
            return;
        }
        var day = this.option[Number(this.value) - 1]["label"].split(" ")[1].split("-")[0].substring(1);
        // 先添加一个空的日程列表
        this.scheduleList.push({
            year: new Date().getFullYear(),
            week: this.value,
            events: []
        });
        // 添加7天的日程
        for (let i = 0; i < 7; i++) {
            const startDate = new Date(2024, 0, Number(day.split("/")[1]) + i);
            this.scheduleList[this.scheduleList.length - 1].events.push({
                date: `2024-${(startDate.getMonth() + 1).toString().padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")} 12:00:00`,
                title: "",
                type: "",
                color: "",
            });
            // 给每个日程添加id
            this.scheduleList[this.scheduleList.length - 1].id = this.scheduleList.length - 1;
        }
        // 禁用当前周
        this.option[Number(this.value) - 1].disabled = true;
        this.value = "";
    }
    // 上传日程列表
    public saveSchedule(year: number, week: number) {
        var thisSchedule = this.scheduleList.find((item) => item.year == year && item.week == week);
        // thisSchedule的events里面的title和type不能有空的
        for (let item of thisSchedule.events) {
            if (item.title == "" || item.type == "") {
                ElMessage.error("请填写完整");
                return;
            }
        }
        postSchedule({
            year: year,
            week: week,
            events: JSON.stringify(thisSchedule.events)
        }).then((res) => {
            ElMessage.success("上传成功");
            // 清空数据
            this.scheduleList = [];
            // 跳转到日程
            this.$router.push({ path: "/schedule" });
        });
    }

    // 删除日程列表
    public deleteSchedule(year: number, week: number) {
        // 删除对应的日程列表
        this.scheduleList.forEach((item, index) => {
            if (item.year == year && item.week == week) {
                this.scheduleList.splice(index, 1);
            }
        });
        // 启用当前周
        this.option[week - 1].disabled = false;
    }
    // 修改日程
    public editSchedule(date: string) {
        // 获取点击的日程的标题
        this.drawerTitle = date.split(" ")[0];
        this.dialog = true;
    }
    // 修改日程点击
    public drawerVerify() {
        // 判断是否为空
        if (this.drawerText == "" || this.drawerSortValue == "" || this.timePicker == "") {
            ElMessage.error("请填写完整");
            return;
        }
        // 修改对应的日程
        this.scheduleList.forEach((item) => {
            item.events.forEach((index: any) => {
                if (index.date.split(" ")[0] == this.drawerTitle) {
                    index.title = this.drawerText;
                    index.type = this.drawerSortValue;
                    index.date = this.drawerTitle + " " + new Date(this.timePicker).toLocaleTimeString();
                    index.color = this.color;
                    // 把type替换成sortOptions对应的label
                    this.sortOptions.forEach((item) => {
                        if (item.value == index.type) {
                            index.type = item.label;
                        }
                    });
                }
            });
        });
        // 清空数据
        this.drawerText = "";
        this.drawerSortValue = "";
        this.timePicker = "";
        this.dialog = false;
    }
    // 创建周数
    created() {
        for (let i = 1; i <= 53; i++) {
            const startDate = new Date(2024, 0, 1 + (i - 1) * 7);
            const endDate = new Date(2024, 0, 1 + i * 7 - 1);
            const startMonth = (startDate.getMonth() + 1).toString().padStart(2, "0");
            const startDay = startDate.getDate().toString().padStart(2, "0");
            const endMonth = (endDate.getMonth() + 1).toString().padStart(2, "0");
            const endDay = endDate.getDate().toString().padStart(2, "0");
            const startDateString = `${startMonth}/${startDay}`;
            const endDateString = `${endMonth}/${endDay}`;
            this.option.push({
                value: i,
                label: `第${i}周 (${startDateString}-${endDateString})`,
                disabled: false,
            });
        }
        this.$store.watch(() => this.$store.state.windowWidth, (newVal) => {
            if (newVal < 930) {
                this.direction = "btt"
            } else {
                this.direction = "rtl"
            }
        });
    }

    mounted(): void {
        if (this.$store.state.windowWidth < 930) {
            this.direction = "btt"
        } else {
            this.direction = "rtl"
        }
        getSchedule().then(res => {
            // 获取res.data.data里面的week,有和option里面的value的周数一样的就disabled
            res.data.data.forEach((item: any) => {
                this.option.forEach((index: any) => {
                    if (index.value == item.week) {
                        index.disabled = true;
                    }
                });
            });
        })
    }
}
</script>
