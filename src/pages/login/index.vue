<template>
    <div>
        <h1>用户登录</h1>
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                    v-model="form.userName"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                    />
                <van-field
                    v-model="form.passWord"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                    />
            </van-cell-group>
            <div class="btn">
                <van-button native-type="submit" round block  type="primary">提交</van-button>
            </div>
        </van-form>
    </div>
</template>
<script setup>
import{ reactive,getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router';  //引入router进行路由跳转

const router = useRouter()//调用路由实例
//获取当前vue实例
const { proxy } = getCurrentInstance()

//表单数据
const form = reactive({
    userName: '',
    passWord:''
})
//表单提交
const onSubmit = async () => {
    const {data} = await proxy.$api.login(form)
    if(data.code===10000){ //code是正常的话设置缓存  = 账号密码正确则进入有token存储的页面
        localStorage.setItem('h5_token',data.data.token)
        localStorage.setItem('h5_userInfo',JSON.stringify(data.data.userInfo))
        router.push('/home')//调用实例上的push方法跳入到首页
    }
};
</script>

<style lang="less" scoped>
h1{
    text-align: center;
    
}
.btn{
    margin: 16px;
}
</style>