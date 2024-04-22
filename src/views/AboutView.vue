<style lang="scss">
.CatMsg {
    .Box-Body {
        display: flex;

        .AboutBoxBodyLeft {
            /* 文字左对齐 */
            text-align: left;
            width: 100%;

            div {
                padding: 0.5rem 0;
            }
        }

        .AboutBoxBodyRight {
            width: 60%;
        }
    }
}

.LiveMsg,
.WebMsg {
    .Box-Body {
        text-align: left;

        div {
            padding: 0.5rem 0;
            /* 设置行间距 */
            line-height: 1.5rem;
        }

        .title {
            font-size: 1.5rem;
            font-weight: bold;
            padding: 1rem 0;
            /* 颜色渐变动画 */
            color: #1989fa;
            animation: colorAnimation 3s infinite;

            @keyframes colorAnimation {
                0% {
                    color: #1989fa;
                }

                50% {
                    color: #ff976a;
                }

                100% {
                    color: #1989fa;
                }
            }
        }
    }
}
</style>
<template>
    <div>
        <h1>About</h1>
        <box class="CatMsg">
            <template #head>
                <div class="AboutBoxHeadLeft">
                    猫的基本信息
                </div>
            </template>
            <template #body class="AboutBoxBody">
                <div class="AboutBoxBodyLeft">
                    <div>姓名：凛喵konn</div>

                    <div>身高：155</div>

                    <div>生日：3.13</div>

                    <div>身份：家里蹲宅女（靠煤球上供和桥洞喵的投喂生存）</div>

                    <div>出道日：2024.2.16</div>

                    <div>居住地：大榕树下桥洞从左往右数第一个房间</div>

                    <div>粉丝牌：桥洞喵</div>

                    <div>桥洞群：368971090</div>

                    <div>
                        <div>Konn背景故事：</div>
                        <div>关键词：被妖怪寄居的自闭笨蛋</div>

                        非常普通的魔法世界里的普通少女，和濒死触手喵怪物进行了猫耳换脑子的交易，
                        但是触手喵啃上konn的脑子后发现她是笨蛋！这点脑子根本不够自己离开konn独自存活，于是两个人开始了一起生存。考试时触手喵怪愿意用自己的魔法帮konn抄答案被义正言辞的拒绝了，于是只能看着konn努力两个小时考出了九分的好成绩，从魔法学院跌跌撞撞的毕业了。目前租住在煤球的桥洞里努力啵啵养活自己中
                    </div>
                </div>
                <div class="AboutBoxBodyRight">
                    <van-image width="100%" height="100%" src="http://img.immoral.top/i/2024/04/22/gwrv9j.png"
                        fit="cover" @click="showPreview('http://img.immoral.top/i/2024/04/22/gwrv9j.png')" />
                </div>
            </template>
        </box>
        <box class="LiveMsg">
            <template #head>
                <div class="AboutBoxHeadLeft">
                    直播信息
                </div>
            </template>
            <template #body>
                <div>
                    <div class="title">直播活动</div>
                    全职vup，每晚11点开时直播，周二没播就是休休了。早上如果睡不着可能掉落早播环节（猫会非常困困的萎靡啵啵或者非常精神的超元气啵啵）每周安排不固定，开播前会在桥洞群里艾特全体成员通知
                </div>
                <div>
                    <div class="title">直播内容</div>
                    杂谈/游戏/绘画  周五固定画画回周六固定一起游戏！其他时间随机安排。由于唱歌跑调并且胆小所以不支持点歌唔，可能会杂谈随机掉落猫小唱小哼不要嫌弃呜呜。
                </div>
                <div>
                    <div class="title">游戏相关</div>
                    猫很容易游戏上头！桥洞喵如果想和猫一起玩当周的游戏可以直接私信猫，游戏回环节konn就算下播也大概率沉浸在游戏里很久很久，所以说下啵也是可以和猫一起玩只是可能不太会注意信息哦。大家可以推荐想和猫一起玩或者想看猫玩的游戏，猫目前直播玩过的有LOL、王者荣耀、幻兽帕鲁、泰拉瑞亚、死亡细胞和其他很多小游戏~但是猫晕3d很严重所以可能婉拒fps和恐怖游戏（绝不是因为胆小）
                </div>
                <div>
                    <div class="title">桥洞快递领取</div>
                    已经填过地址的舰长在舰期间桥洞礼物都会顺之前的地址发放，如果需要更改地址或者第一次填写地址的舰长可以在舰长群（上舰的大人注意私信）里填写当月地址收集表哦。如果上个月顺原地址寄出的礼物无人领取或者退回的话会暂停舰礼的发放，舰长大人可以私戳猫猫激活重发。
                </div>
            </template>
        </box>
        <box class="WebMsg">
            <template #head>
                <div class="AboutBoxHeadLeft">
                    网站信息
                </div>
            </template>
            <template #body>
                <div>
                    本网站由凛喵的一小片天制作并提供技术支持，定位为粉丝专页，与凛喵konn以及相关企划、公司无关联，本站用到的所有形象、素材资源的版权均归属于相应版权方
                </div>
                <div>
                    <div class="title">建站初衷</div>
                    本站建立的初衷是为了方便粉丝查看凛喵konn的相关信息，包括直播信息、活动信息、粉丝福利、新衣等，同时也是为了提供一个交流的平台，让粉丝们可以更好地了解凛喵konn
                </div>
                <div>
                    <div class="title">其他说明</div>
                    <div>
                        本站技术使用Vue3 + TypeScript + Vite2 + Vant3 + SCSS + Axios + Vuex + Vue Router + Eslint + Prettier
                    </div>
                    <div>
                        外部UI使用<a href="https://vant-contrib.gitee.io/vant/#/zh-CN/home">Vant4</a>, <a href="https://element-plus.org/zh-CN/component/overview.html">Element Plus</a>,<a href="http://img.immoral.top/">图床</a>使用自行搭建的简单图床服务
                    </div>
                </div>
            </template>
        </box>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Box from '@/components/Box.vue';
// 引入图片预览组件
import { showImagePreview } from 'vant';

@Options({
    components: {
        Box
    },
})
export default class extends Vue {
    data(): object {
        return {
        }
    }
    // 动态响应
    public dynamicWidth(width: number) {
        var BoxBody = document.getElementsByClassName('Box-Body') as HTMLCollectionOf<HTMLElement>;
        var AboutBoxBodyRight = document.getElementsByClassName('AboutBoxBodyRight') as HTMLCollectionOf<HTMLElement>;
        if (width < 1030) {
            BoxBody[0].style.flexDirection = 'column';
            AboutBoxBodyRight[0].style.width = '100%';
        } else {
            BoxBody[0].style.flexDirection = 'row';
            AboutBoxBodyRight[0].style.width = '60%';
        }
    }
    // 点击预览
    public showPreview(url: any) {
        showImagePreview({
            images: [url],
            startPosition: 0
        });
    }
    // 监听窗口宽度变化
    created() {
        this.$store.watch(() => this.$store.state.windowWidth, (newVal) => {
            this.dynamicWidth(newVal);
        })
    }
    // 初始化
    public mounted(): void {
        this.dynamicWidth(this.$store.state.windowWidth);
    }
}
</script>
