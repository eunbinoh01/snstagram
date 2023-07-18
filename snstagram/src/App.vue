<template>
<div>
  <div class="header">
    <ul class="header-button-right">
      <li v-if="step === 1" @click="step++">Next</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step === 2" @click="publish">Publish</li>
    </ul>
    <ul class="header-button-left">
      <li v-if="step === 2" @click="step = 0">Cancel</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <!-- Tab select Area -->
  <div class="tab_area">
    <span class="tab_button" @click="step = 0">Posts</span>
    <span class="tab_button" @click="step = 1">Detail</span>
    <span class="tab_button" @click="step = 2">Write</span>
  </div>

  <!-- store 꺼내 쓰는 법 -->
  <!-- <h4> {{  $store.state.likes }}</h4> -->
  <!-- <h4> {{  $store.state.name }}</h4> -->
  <!-- <button @click="$store.state.name = '블라블라'">CHANGE</button>  
       : store는 컴포넌트에서 직접 값을 수정하면 안됨! 
       => 수정하고 싶으면 store_ mutations( store.commit('fx') ) 에 명령할 것! 
  -->
  <!-- <button @click="$store.commit('changeNm')">CHANGE</button> -->
  <!-- <button @click="$store.commit('pushLike', 1)">LIKE</button> -->

  <ContainerA :myData="myData" :step="step" :imgUrl="imgUrl" @write="writePost($event), $event" />
  <button v-if="step === 0" class="more_btn" @click="more()">더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="uploadImg" accept="image/*" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+ UPLOAD</label>
    </ul>
  </div>

</div>
</template>

<script>
import ContainerA from './components/ContainerA';
import myData from './assets/myData.js';
import axios from 'axios'


export default {
  name: 'App',
  data(){
    return {
      myData : myData,
      postCnt : 0,
      step : 0,
      imgUrl : '' ,
      postContent : '',
      selectFilter : ''
    }
  },
  mounted(){
    this.emitter.on('adaptFilter', (f)=> {
      this.selectFilter = f; 
    })
  },
  components: {
    ContainerA,
  },
  methods : {
    more(){
      if(this.postCnt > 1) return;
      axios.get(`https://codingapple1.github.io/vue/more${this.postCnt}.json`)
      .then( res => {
        this.myData.push(res.data)
        this.postCnt++;
      })
    },
    uploadImg(e){
      let files = e.target.files;
      this.imgUrl = URL.createObjectURL(files[0]);

      this.step++;
    },
    writePost(content){
      this.postContent = content;
    },
    publish(){
      let postData = {
        name: "Vue Developer",
        userImage: this.imgUrl,
        postImage: this.imgUrl,
        likes: 0,
        date: new Date().getMonth()+1 + '월 ' + new Date().getDay() +'일',
        // date: Intl.DateTimeFormat('en-US', {month:'long'}).format(new Date())+ ' ' + new Date().getDay(),
        liked: false,
        content: this.postContent,
        filter: this.selectFilter  
      }
      this.myData.unshift(postData);
      this.step = 0;
    },
  }
}
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color:  rgb(61, 100, 61);
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: rgb(61, 100, 61);
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  text-align: center;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
  margin: 20px 5px 100px 5px;
  color:  rgb(61, 100, 61);
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
.more_btn{
  width: 100%;
  border-radius: 9px;
  border-color: rgba(61, 100, 61, 0.772);
  background-color: rgb(248, 255, 248);
  color: rgb(17, 61, 17);
  margin: 20px 5px;
  cursor: pointer;
}
.tab_area{
  margin: 50px 10px 50px 10px;
  display: flex;
  justify-content: space-between;
}
.tab_button {
  color: rgba(61, 100, 61, 0.772);
  width: 100px;
  height: 20px;
  border: 1px solid rgba(61, 100, 61, 0.772);
  border-radius: 8px;
  padding: 3px 10px;
  cursor: pointer;
  text-align: center;
  
}
</style>
