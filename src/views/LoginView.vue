<template>
    <div class="background">
        <div class="LoginLogo">Login</div>
        <div class="LoginBox">
            <!-- 登录Input -->
            <div class="LoginInput" v-if="!MozAnimation">
                <div class="LoginInputBox InputBox">
                    <input type="text" required v-model="account">
                    <label>账号</label>
                </div>
                <div class="LoginInputBox InputBox">
                    <input type="password" required v-model="password">
                    <label>密码</label>
                </div>
            </div>
            <!-- 注册Input -->
            <div class="RegisterInput" v-else>
                <div class="RegisterInputBox InputBox">
                    <input type="text" required v-model="account">
                    <label>账号</label>
                </div>
                <div class="RegisterInputBox InputBox">
                    <input type="password" required v-model="password">
                    <label>密码</label>
                </div>
                <div class="RegisterInputBox InputBox">
                    <input type="password" required v-model="confirmPassword">
                    <label>确认密码</label>
                </div>
            </div>
            <button class="LoginBtn" @click="Login">{{ !MozAnimation ? '登录' : '注册' }}</button>
            <div class="HandOff" @click="mozAnimation">
                <van-icon name="exchange" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
// 引入接口
import {
    postLogin,
    postRegister
} from '../api/api';

@Options({
    components: {

    },
})

export default class LoginView extends Vue {
    MozAnimation: any;
    account!: string;
    password!: string;
    confirmPassword!: string;

    data(): object {
        return {
            MozAnimation: false,
            account: '',
            password: '',
            confirmPassword: ''
        };
    }
    // 点击切换登录注册
    public mozAnimation(): void {
        // LoginBox元素添加class
        const LoginBox = document.querySelector('.LoginBox');
        if (!this.MozAnimation) {
            LoginBox?.classList.add('MozAnimation');
        } else {
            LoginBox?.classList.remove('MozAnimation');
        }
        // 延迟1.7s后改变MozAnimation的值
        setTimeout(() => {
            this.MozAnimation = !this.MozAnimation;
        }, 600);
    }

    // 登录
    public Login(): void {
        // 根据MozAnimation的值判断是登录还是注册
        if (!this.MozAnimation) {
            postLogin({
                account: this.account,
                password: this.password,
            }).then((res) => {
                // 请求拦截处做了处理，如果res为undefined则直接return
                if (res == undefined) {
                    return;
                }
                if (res.data.code === 0) {
                    ElMessage.success('登录成功');
                    // 把用户信息存储到sessionStorage
                    sessionStorage.setItem('userInfo', JSON.stringify(res.data.data));
                    // 登录成功后跳转到首页
                    this.$router.push('/');
                } else {
                    ElMessage.error(res.data.msg);
                }
            });
        } else {
            // 验证密码是否一致
            if (this.password !== this.confirmPassword) {
                ElMessage.error('两次密码不一致');
                return;
            }
            postRegister({
                account: this.account,
                password: this.password,
            }).then((res) => {
                // 请求拦截处做了处理，如果res为undefined则直接return
                if (res == undefined) {
                    return;
                }
                if (res.data.code === 0) {
                    ElMessage.success('注册成功');
                    // 注册成功后跳转到登录页
                    this.mozAnimation();
                } else {
                    ElMessage.error(res.data.msg);
                }
            });
        }
    }
}
</script>

<style scoped lang="scss">
.background {
    min-height: 100vh;
    background: linear-gradient(#141e30, #243b55);
}

.LoginLogo {
    font-size: 4rem;
    color: white;
    padding: 1rem;
    font-family: 'Cunia';
    /* 调整字间距 */
    letter-spacing: 0.1rem;
    /* 居中 */
    text-align: center;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.LoginBox {
    min-height: 50vh;
    width: 70vw;
    /* 居中 */
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -25vh;
    margin-left: -35vw;
    border-radius: 10px;
    box-shadow: 0 15px 25px rgb(12, 19, 29);
    background-color: rgb(12, 19, 29);
    transition: 1s;

    .HandOff {
        /* 定位到右下角 */
        position: relative;
        bottom: 0;
        right: -40%;
        margin: 0.6rem;
        font-size: 1.7rem;
        color: #8b8888;
    }
}

.LoginInput,
.RegisterInput {
    margin-top: 5rem;

    .InputBox {
        position: relative;
        margin: 1rem;
        width: 80%;
        margin: 0 auto;

        input {
            width: 100%;
            padding: 10px 0;
            font-size: 16px;
            color: #fff;
            margin-bottom: 30px;
            border: none;
            border-bottom: 1px solid #fff;
            background: transparent;
            outline: none;

            &:focus {
                border-bottom: 1px solid #03a9f4;
            }

            &:valid~label,
            &:focus~label {
                top: -18px;
                left: 0;
                color: #03a9f4;
                font-size: 12px;
            }
        }

        label {
            position: absolute;
            top: 0;
            left: 0;
            padding: 10px 0;
            color: #fff;
            font-size: 16px;
            pointer-events: none;
            transition: 0.5s;
        }
    }
}

.RegisterInput {
    margin-top: 2rem;
}

.LoginBtn {
    width: 80%;
    /* 居中 */
    margin: 0 auto;
    margin-top: 10px;
    padding: 10px 0;
    font-size: 18px;
    color: #fff;
    background: linear-gradient(90deg, #141e30, #243b55);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    transition: 0.5s;

    &:active {
        background: linear-gradient(90deg, #243b55, #141e30);
        /* 边框光效转圈 */
        box-shadow: 0 0 10px #03a9f4, 0 0 40px #03a9f4, 0 0 80px #03a9f4;
    }


}

/* 翻转动画 */
.MozAnimation {
    transform: rotateY(360deg);
    transform-origin: center;
    transition: 1.7s;
}
</style>