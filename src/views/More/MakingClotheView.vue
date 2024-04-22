<style scoped lang="scss">
.BoxHead {
    display: flex;
    justify-content: space-between;
    /* 文字上下居中 */
    align-items: center;

    .BoxHeadRight {
        width: 4rem;
    }
}

::v-deep .van-uploader__upload {
    background: none;
    border: 1px solid #5f7285;
    border-radius: 5px;
}

::v-deep .el-select__wrapper {
    background: none;
}

:global(.el-popper) {
    background: #2c3b50 !important;
    border: #2c3b50 !important;
    font-family: 'DancingScript-Bold' !important;
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

/* ::v-deep .van-uploader__upload, ::v-deep .van-uploader__preview-image {
    width: 12rem !important;
    height: 12rem !important;
} */

::v-deep .van-uploader__wrapper {
    justify-content: center;
}
</style>
<template>
    <div>
        <h2>Making Clothe</h2>
        <box>
            <template #head>
                <div class="BoxHead">
                    <div class="BoxHeadLeft">
                        <div>上传新衣</div>
                    </div>
                    <div class="BoxHeadRight">
                        <van-button type="primary" size="small" color="#352872" block
                            @click="uploadClothe">上传</van-button>
                    </div>
                </div>
            </template>
            <template #body>
                <el-input v-model="Title" style="width: 100%" autosize type="textarea" placeholder="输入标题"
                    resize="none" />
                <el-select v-model="value" multiple placeholder="选择分类" style="width: 100%">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    <!-- 添加可自定义标签 -->
                    <template #footer>
                        <el-button v-if="!isAdding" text bg size="small" @click="onAddOption">
                            新加标签
                        </el-button>
                        <template v-else>
                            <el-input v-model="optionName" class="option-input" placeholder="添加标签" size="small" />
                            <el-button type="primary" size="small" @click="onConfirm">
                                添加
                            </el-button>
                        </template>
                    </template>
                </el-select>
                <div style="width: 90%; margin: 0 auto; margin-top: 1rem">
                    <van-uploader v-model="fileList" multiple :max-count="9" :after-read="uploadImg"
                        :before-read="beforeRead" />
                </div>
            </template>
        </box>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ElSelect, ElOption, ElButton, ElInput, ElLoading, ElMessage } from 'element-plus';
import 'element-plus/es/components/select/style/css';
import 'element-plus/es/components/option/style/css';
import 'element-plus/es/components/button/style/css';
import 'element-plus/es/components/input/style/css';
import 'element-plus/es/components/loading/style/css';
import Box from '@/components/Box.vue';
import {
    postUploadClothe,
    postUploadImg,
    getClotheSort
} from '../../api/api';
@Options({
    components: {
        Box,
        ElSelect,
        ElOption,
        ElButton,
        ElInput,
        ElLoading
    },
})
export default class MakingClotheView extends Vue {
    fileList = [];
    value = '';
    isAdding = false;
    optionName = '';
    Title = '';
    options: any[] = [];
    imgList: any[] = [];
    // ============================== 分类框 ==============================
    // 获取分类
    public async getSort() {
        const res = await getClotheSort();
        this.options = res.data.data.map((item: any) => {
            return {
                value: item.id,
                label: item.value
            };
        });
    }
    // 添加选项
    public onAddOption() {
        this.isAdding = true;
    }
    // 确认添加
    public onConfirm() {
        this.options.push({
            value: this.optionName,
            label: this.optionName,
        });
        this.isAdding = false;
    }
    // 取消添加
    public clear() {
        this.isAdding = false;
        this.optionName = '';
    }
    // ============================== 上传框 ==============================
    // 上传图片
    public async uploadImg(file: any) {
        var loading = ElLoading.service({
                lock: true,
                text: '上传中',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        // 判断是否为单个文件
        if (file.length === undefined) {
            loading.setText('上传中');
            const res = await postUploadImg({
                image: file.file
            });
            this.dynamicWidth(this.$store.state.windowWidth, 5.2);
            this.imgList.push(res.url);
            loading.close();
        } else {
            // 循环上传
            for (let i = 0; i < file.length; i++) {
                loading.setText(`上传中${i + 1}/${file.length}`);
                const res = await postUploadImg({
                    image: file[i].file
                });
                this.dynamicWidth(this.$store.state.windowWidth, 5.2);
                this.imgList.push(res.url);
            }
            loading.close();
        }

    }
    // 上传衣柜
    public async uploadClothe() {
        // 判断是否有空值
        if (this.Title == '' || this.value == '' || this.imgList.length == 0) {
            ElMessage.error('请填写完整');
            return;
        }
        const res = await postUploadClothe({
            title: this.Title,
            sort: JSON.stringify(this.value),
            image_list: JSON.stringify(this.imgList)
        });
        if (res.data.code == 0) {
            ElMessage.success('上传成功');
            setTimeout(() => {
                this.$router.push('/statistics');
            }, 1);
        } else {
            ElMessage.error('上传失败');
        }
    }
    // 动态获取宽度,修改图片大小
    public dynamicWidth(width: number, count: number) {
        var van_uploader = document.getElementsByClassName('van-uploader__upload')[0] as HTMLElement
        if (van_uploader != undefined) {
            van_uploader.style.width = `${width / count}px`;
            van_uploader.style.height = `${width / count}px`;
        }
        var van_uploader__preview_image = document.getElementsByClassName('van-uploader__preview-image') as unknown as NodeListOf<HTMLElement>
        for (let i = 0; i < van_uploader__preview_image.length; i++) {
            van_uploader__preview_image[i].style.width = `${width / count}px`;
            van_uploader__preview_image[i].style.height = `${width / count}px`;
        }
    }
    // 上传前判断
    public beforeRead(file: any) {
        if (file.length == undefined) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                ElMessage.error('上传图片只能是 JPG 格式或 PNG 格式!');
            }
            if (!isLt2M) {
                ElMessage.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        } else {
            for (let i = 0; i < file.length; i++) {
                const isJPG = file[i].type === 'image/jpeg' || file[i].type === 'image/png';
                const isLt2M = file[i].size / 1024 / 1024 < 2;
                if (!isJPG) {
                    ElMessage.error('第' + (i + 1) + '张图片只能是 JPG 格式或 PNG 格式!');
                    // 删除错误图片
                    file.splice(i, 1);
                }
                if (!isLt2M) {
                    ElMessage.error('第' + (i + 1) + '张图片大小不能超过 2MB!');
                    // 删除错误图片
                    file.splice(i, 1);
                }
                return isJPG && isLt2M;
            }
        }
    }

    created(): void {
        this.getSort();
        this.$store.watch(() => this.$store.state.windowWidth, (newVal) => {
            this.dynamicWidth(newVal, 5.2);
        })
    }
    mounted(): void {
        this.dynamicWidth(this.$store.state.windowWidth, 5.2);
    }
}
</script>
