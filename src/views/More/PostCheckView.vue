<style scoped lang="scss">
:global(.el-table) {
    --el-table-tr-bg-color: none;
    --el-table-bg-color: none;
    --el-table-header-bg-color: none;
    --el-table-border-color: #3b4253;
    --el-table-border: 1px solid #3b4253;
    --el-table-row-hover-bg-color: #1f3351;
}

:global(.el-tag--plain) {
    --el-tag-bg-color: #3b3f77;
}

:global(.el-table__expanded-cell) {
    background: none;
}

::v-deep .van-grid-item__content {
    background: none !important;
}
</style>
<template>
    <div>
        <h1>
            Post Check
        </h1>
        <box>
            <template #head>
                <div>
                    待审核
                </div>
            </template>
            <template #body>
                <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="expand">
                        <template #default="scope">
                            <van-grid :border="false" :column-num="imgCount">
                                <van-grid-item v-for="(itemI, indexI) in scope.row.image_list" :key="indexI"
                                    @click="showPreview(itemI)">
                                    <van-image lazy-load :src="itemI" fit="cover" height="100%" width="100%"
                                        radius="0.5rem" />
                                </van-grid-item>
                            </van-grid>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" label="Date" width="180" />
                    <el-table-column prop="title" label="title" width="80" />
                    <el-table-column prop="create_user" label="user" width="120" />
                    <el-table-column prop="sort" label="sort">
                        <template #default="scope">
                            <el-tag v-for="item in scope.row.sort" effect="plain" style="margin-right: 0.5rem;">{{ item
                                }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="Operations" width="160">
                        <template #default="scope">
                            <el-button size="small" type="success" @click="postCheckClothe(scope.row.closet_id, 1)">
                                通过
                            </el-button>
                            <el-button size="small" type="danger" @click="postCheckClothe(scope.row.closet_id, 0)">
                                驳回
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </box>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Box from '@/components/Box.vue';
import {
    getClotheList
} from '../../api/api';
// 引入图片预览组件
import { showImagePreview } from 'vant';
import {
    postCheckClothe
} from '../../api/api';
import { ElMessage } from 'element-plus';
@Options({
    components: {
        Box,
    },
})
export default class PostCheckView extends Vue {
    tableData = [
        {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        }
    ]
    imgCount = 5;
    public handleSelectionChange(val: any) {
        console.log(val);
    }
    // 点击预览
    public showPreview(url: any) {
        showImagePreview({
            images: [url],
            startPosition: 0
        });
    }
    // 审核
    public async postCheckClothe(id: number, type: number) {
        await postCheckClothe({
            id,
            type
        }).then((res: any) => {
            console.log(res.data);
            if (res.data.code === 1) {
                ElMessage.success(res.data.msg);
                // 获取衣服列表
                getClotheList({
                    type: 0,
                    page: 1,
                    size: 9999,
                    id: 0
                }).then((res: any) => {
                    this.tableData = res.data.data;
                    this.tableData.forEach((item: any) => {
                        item.sort = JSON.parse(item.sort);
                        item.image_list = JSON.parse(item.image_list);
                    });
                });
            }
        });
    }
    async created() {
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
        });
        // 获取衣服列表
        await getClotheList({
            type: 0,
            page: 1,
            size: 9999,
            id: 0
        }).then((res: any) => {
            this.tableData = res.data.data;
            this.tableData.forEach((item: any) => {
                item.sort = JSON.parse(item.sort);
                item.image_list = JSON.parse(item.image_list);
            });
        });
    }
    mounted(): void {
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
}
</script>
