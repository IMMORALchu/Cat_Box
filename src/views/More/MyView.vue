<style lang="scss">
.MyBoxLeft {
    max-height: 65vh;

    .Box-Head {
        display: flex;

        .MyBoxHeadLeft {
            width: 50%;
            text-align: left;
            line-height: 2rem;
        }

        .MyBoxHeadRight {
            width: 50%;
            text-align: right;

            .van-button {
                width: 4rem;
                background: #3f58a7 !important;
                border-color: #405cb5 !important;
            }
        }
    }

    .Box-Body {
        .MyBoxBodyImg {
            padding: 1rem;

            .van-image {
                border: 1px solid black;
                border-radius: 50%;
                overflow: hidden;
                box-shadow: 0 0 10px #3f58a7;
            }
        }

        .van-cell-group {
            background: none;
        }

        .van-field__label,
        .van-field__control {
            color: #dcc4c4;
        }

        .van-field__button {
            /* 居中 */
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .van-cell {
            /* 文字垂直居中 */
            line-height: 2rem;
        }
    }
}

.MyBoxRight {
    .Box-Body {

        .van-cell-group {
            background: none;
        }

        .van-field__label,
        .van-field__control {
            color: #dcc4c4;
        }

        .van-field__button {
            /* 居中 */
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .van-cell {
            /* 文字垂直居中 */
            line-height: 2rem;
        }

        .van-field__control {
            /* 文字靠右 */
            text-align: right;
            /* 文字向左稍稍偏移 */
            padding-right: 1rem;
        }


        .van-grid-item__content {
            background: none !important;
        }

        .van-cell {
            font-size: 1rem !important;
            color: #6e63d4;
        }

        .BoxBodyItem {

            .BoxBodyItemRightTitle,
            .BoxBodyItemRightMsg {
                /* 文字靠左 */
                text-align: left;
            }

            .van-cell__title {
                color: #5ddabf;
            }

            .van-cell:after {
                width: 10rem !important;
                margin: 0 auto !important;
                /* 虚线 */
                border-bottom: 2px solid #63378c;
            }
        }
        .van-collapse-item__content {
            max-width: 60vw;
        }
    }
}
</style>
<template>
    <div>
        <h2>My View</h2>
        <div class="Box">
            <box class="MyBoxLeft">
                <template #head>
                    <div class="MyBoxHeadLeft">
                        我的信息
                    </div>
                    <div class="MyBoxHeadRight">
                        <van-button type="primary" size="small" v-if="status" @click="status = false">编 辑</van-button>
                        <van-button type="primary" size="small" v-else @click="save">保 存</van-button>
                    </div>
                </template>
                <template #body>
                    <div class="MyBoxBodyImg">
                        <van-uploader :after-read="uploadImg">
                            <van-image width="150" height="150" :src="avatar" fit="cover" />
                        </van-uploader>
                    </div>
                    <van-cell-group inset>
                        <!-- 输入任意文本 -->
                        <van-field v-model="name" label="用户名" :disabled="status" />
                        <!-- 输入密码 -->
                        <van-field v-model="password" type="password" label="密码" :disabled="status || !checked">
                            <template #button>
                                <van-switch v-model="checked" />
                            </template>
                        </van-field>
                        <van-field v-model="verifyPassword" type="password" label="确认密码"
                            :disabled="status || !checked" />
                        <!-- 输入手机号，调起手机号键盘 -->
                        <van-field v-model="tel" type="tel" label="手机号" :disabled="status" />
                    </van-cell-group>
                </template>
            </box>
            <box class="MyBoxRight">
                <template #head>
                    <div class="MyBoxHeadLeft">
                        上传信息
                    </div>
                </template>
                <template #body>
                    <van-cell-group inset>
                        <!-- 输入任意文本 -->
                        <van-field v-model="name" label="当前共上传" disabled />
                        <van-field v-model="name" label="当前待审核" disabled />
                    </van-cell-group>
                    <van-collapse v-model="activeNames" class="BoxBodyCollapse">
                        <van-collapse-item :name="index" :title="item['year'] + '年'" v-for="(item, index) in ClotheList"
                            :key="index">
                            <van-collapse v-model="monthActiveNames">
                                <van-collapse-item :name="indexM" :title="itemM['month'].replace(/^0/, '') + '月'"
                                    class="BoxBodyItem" v-for="(itemM, indexM) in item['month']" :key="indexM">
                                    <div class="BoxBodyItemRight" v-for="(itemD, indexD) in itemM['data']"
                                        :key="indexD">
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

    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Box from '@/components/Box.vue';
import { ElMessage, ElLoading } from 'element-plus'
// 手动引入element-plus的message组件样式
import 'element-plus/es/components/message/style/css'
// 手动引入element-plus的loading组件样式
import 'element-plus/es/components/loading/style/css'
// 引入图片预览组件
import { showImagePreview } from 'vant';
import {
    postUpdate,
    postUploadImg,
    getUserInfo,
    getClotheList
} from '../../api/api';
@Options({
    components: {
        Box
    },
})
export default class MyView extends Vue {
    name = '';
    password = '';
    verifyPassword = '';
    tel = '';
    avatar = '';
    activeNames = [];
    status = true;
    checked = false;
    ClotheList: any[] = [];
    monthActiveNames: any;
    showImg: boolean = false;
    imgCount = 5;
    data(): object {
        return {
            // 折叠面板激活的面板
            activeNames: [],
            // 月份折叠面板激活的面板
            monthActiveNames: [],
            // 衣服列表
            ClotheList: [],
            // 是否显示图片
            showImg: false,
        }
    }
    public save(): void {
        var params = {};
        // 判断是否修改密码
        if (this.checked) {
            params = {
                user_id: JSON.parse(localStorage.getItem('userInfo') || '{}').user_id,
                user_name: this.name,
                user_phone: this.tel,
                user_password: this.password,
                user_avatar: this.avatar
            }
            if (this.password !== this.verifyPassword) {
                ElMessage.error('两次输入的密码不一致');
                return;
            } else {
                postUpdate(params).then(res => {
                    if (res.data.code === 0) {
                        ElMessage.success('修改成功');
                        getUserInfo().then(res => {
                            localStorage.setItem('userInfo', JSON.stringify(res.data.data));
                        })
                        this.status = true;
                    } else {
                        ElMessage.error('修改失败');
                    }
                }).catch(err => {
                    ElMessage.error('修改失败');
                })
            }
        } else {
            params = {
                user_id: JSON.parse(localStorage.getItem('userInfo') || '{}').user_id,
                user_name: this.name,
                user_phone: this.tel,
                user_avatar: this.avatar
            }
            postUpdate(params).then(res => {
                if (res.data.code === 0) {
                    ElMessage.success('修改成功');
                    getUserInfo().then(res => {
                        localStorage.setItem('userInfo', JSON.stringify(res.data.data));
                    })
                    this.status = true;
                } else {
                    ElMessage.error('修改失败');
                }
            }).catch(err => {
                ElMessage.error('修改失败');
            })
        }

    }

    // 点击预览
    public showPreview(url: any) {
        showImagePreview({
            images: [url],
            startPosition: 0
        });
    }

    // 上传图片
    public async uploadImg(file: any) {
        var loading = ElLoading.service({
            lock: true,
            text: '上传中',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        loading.setText('上传中');
        const res = await postUploadImg({
            image: file.file
        });
        this.avatar = res.url;
        loading.close();
    }

    created(): void {
        // 从本地存储中获取用户信息
        const userInfo = localStorage.getItem('userInfo');
        this.name = JSON.parse(userInfo || '{}').user_name;
        this.tel = JSON.parse(userInfo || '{}').user_phone;
        this.avatar = JSON.parse(userInfo || '{}').user_avatar;
        this.$store.watch(() => this.$store.state.windowWidth, (newVal) => {
            if (newVal <= 600) {
                var Box = document.getElementsByClassName('Box')[0] as HTMLElement;
                Box.style.display = 'block';

            } else {
                var Box = document.getElementsByClassName('Box')[0] as HTMLElement;
                Box.style.display = 'flex';
            }

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

    async mounted() {
        if (this.$store.state.windowWidth <= 600) {
            var Box = document.getElementsByClassName('Box')[0] as HTMLElement;
            Box.style.display = 'block';
        } else {
            var Box = document.getElementsByClassName('Box')[0] as HTMLElement;
            Box.style.display = 'flex';
        }
        // 获取衣服列表
        await getClotheList({
            type: 0,
            page: 1,
            size: 9999,
            id: 1
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
}
</script>
