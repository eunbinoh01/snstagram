import axios from 'axios';
import { createStore } from 'vuex'

const store = createStore({
    state(){
        return {
            name : 'BlaBla',
            myData : {
                likes: 0,
                liked: false,
            },
            more : {}
        }
    },
    mutations : {
        /** mutations : state 변경 함수들 */
        changeNm (state) {
            state.name = state.name === 'BlaBla' ? '블라블라' : 'BlaBla'
        },
        pushLike (state, myData) {
            state.myData.liked = myData.liked;
            state.myData.likes = myData.likes;
            if (myData.liked === true){
                myData.liked = state.myData.liked = false
                myData.likes = state.myData.likes -= 1
            } else {
                myData.liked = state.myData.liked = true
                myData.likes = state.myData.likes += 1
            }
        },
        setMore(state, data){
            /** actions로 인해 변경된 state도 무조건 mutation에서 해야 함 */
            state.more = data
        }
    },
    actions : {
        /** actions : ajax 서버데이터통신, 또는 오래걸리는 작업들 */
        getData(context){
            axios.get(`https://codingapple1.github.io/vue/more0.json`)
            .then((res)=> {
                console.log(res.data)
                context.commit('setMore',res.data)
            })
        }
    }
})

export default store;