<template>
  
  <RouterView />
  <van-tabbar v-model="active">
    <van-tabbar-item  
        v-for="item in router.options.routes[0].children" 
        :key="item.path" 
        :icon="item.meta.icon"
        :url="`#/${item.path}`">{{ item.meta.name }}
    </van-tabbar-item>

  </van-tabbar>
</template>
<script setup>
import {ref,onMounted} from 'vue' //创建一个响应式的变量,在mounted生命周期中调用函数
import {useRouter , useRoute} from 'vue-router' //拿到整个的Router实例和当前的路由对象

const active = ref(0)
const router = useRouter()
const route = useRoute()
onMounted(()=>{
    console.log(router,"router")
    const data = router.options.routes[0]
    active.value = data.children.findIndex(item => '/'+ item.path === route.path)
})
</script>