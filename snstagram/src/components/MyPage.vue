<template>
    <div style="padding : 10px">
        <h4>팔로워</h4>
        <input @input="searchName" placeholder="?" />
        <div class="post-header" v-for="f in follower" :key="f">
            <div class="profile" style="`background-image: :url(${f.image})`"></div>
            <span class="profile-name">{{ f.name }}</span>
        </div>
    </div>
</template>
        
<script>
import axios from 'axios';
import {  onMounted, ref, toRefs, watch } from 'vue';
// import { useStore } from 'vuex'

export default {
    name: 'MyPage',
    props : {
        one : Number,
        two : Number
    },

    /** composition API */
    setup(props, context){
        let follower = ref([]);
        let followerOrigin = ref([]);

        let { one, two } = toRefs(props)
        console.log(one.value)
        console.log(context)

        watch(two , () => {})

        // let result = computed(()=> {
        //     return follower.value.length
        // })

        // let store = useStore()
        //console.log(store.state.name) // $store 처럼 사용
        // console.log(store.commit())

        onMounted(()=> {
            axios.get('/follower.json')
            .then((res)=>{
                follower.value = res.data
                followerOrigin.value = [...res.data]
            })
        })
        

        function searchName (e) {
            let matchName = followerOrigin.value.filter(x => {
                return x.name.indexOf(e.target.value) != -1
            })
            follower.value = [...matchName]
            // Object.assign(follower.value, matchName);
        }

        return { follower, searchName }
    }
}
</script>

<style>


</style>
