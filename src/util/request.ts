import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios"
// 手动引入element-plus的message组件样式
import 'element-plus/es/components/message/style/css'
// 手动引入element-plus的loading组件样式
import 'element-plus/es/components/loading/style/css'
// 手动引入element-plus的组件
import { ElLoading, ElMessage } from 'element-plus'

interface Result<T = any> {
  code: number | string;
  msg: string;
  data: T;
  total: number;
};


// 导出Request类，可以用来自定义传递配置来创建实例
class HttpRequest {
  baseURL: string;
  timeout: number;

  constructor() {
    this.baseURL = '/api';
    this.timeout = 60000
  }

  request<T = any>(options: AxiosRequestConfig): Promise<Result<T>> {
    // axios 实例
    const instance: AxiosInstance = axios.create()
    this.setInterceptors(instance)
    const opts = this.mergeOptions(options)
    return instance(opts)
  }

  get<T = any>(url: string, data?: any, outHeaders = {}): Promise<Result<T>> {
    return this.request<T>({
      method: 'get',
      url,
      params: { ...data }, // get参数可以直接展开
      headers: {}
    })
  }

  post<T = any>(url: string, body = {}, outHeaders = {}): Promise<Result<T>> {
    let data = body
    let headers = outHeaders
    return this.request<T>({
      method: 'post',
      url,
      headers,
      data, // post要求必须传入data属性
    })
  }
  mergeOptions(options: AxiosRequestConfig) {
    //console.log('合并参数', options)
    return {
      baseURL: this.baseURL,
      timeout: this.timeout,
      ...options
    }
  }
  // 设置拦截器
  setInterceptors(instance: AxiosInstance) {
    let loading: any
    // 请求拦截器
    instance.interceptors.request.use((config) => {
      // 上传接口单独处理
      if (config.url != 'https://www.imgtp.com/api/upload') {
        loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
      }

      // 一般会请求拦截里面加token，用于后端的验证
      /*       const token = localStorage.getItem("token")
            config!.headers!.Authorization = token
            config.headers = Object.assign(config.headers, { ...config.headers, token }); */

      return config
    },
      (err: any) => {
        console.log(err);
        return Promise.reject(err);
      })

    // 响应拦截器
    instance.interceptors.response.use(
      (res) => {
        // console.log("🚀 ~ file: axios.ts:89 ~ HttpRequest ~ setInterceptors ~ res:", res)
        if (res.config.url != 'https://www.imgtp.com/api/upload') {
          loading.close()
        }
        let { status, data } = res
        if (data.ret === 200) {
          if (data.data.code === 100) {
            // cookie过期
            ElMessage.info('登录过期，请重新登录')
            setTimeout(() => {
              window.location.href = '/login'
            }, 1000)
          } else {
            return data
          }
        }
        else {
          if (res.config.url != 'https://www.imgtp.com/api/upload') {
            ElMessage.info(data || '请求失败')
          }
          return data
        }
      },
      err => {
        console.log('axios报错', err)
        ElMessage.error(err.message)
        loading.close() // 立即关闭加载框
        return Promise.reject(err)
      }
    )
  }
}
// 默认导出Request实例
export default new HttpRequest()