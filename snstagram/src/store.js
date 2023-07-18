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
        }
    },
    actions : {

    }
})

export default store;