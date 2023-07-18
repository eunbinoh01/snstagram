<template>
<div>
  <!-- Tab_0 ) Posts List -->
  <div v-if="step===0">
    <PostArea v-for="md in myData" :key="md" :myData="md"/>
  </div>

  <!--  Tab_1 ) Detail 필터선택페이지 -->
  <div v-if="step===1">
    <div class="upload-image" :class="selectFilter" :style="`background-image: url(${imgUrl})`" ></div>
    <div class="filters">
      <FilterBox :imgUrl="imgUrl" v-for="f in filters" :key="f" :filterNm="f">
        <!-- 자식 slot에  데이터 전달--> 
        {{ f }}
        <!-- 
          slot 여러개 사용하는 법
          <template v-slot:slotA> 데이터A</template>
          <template v-slot:slotB> 데이터A</template> 
          -->
        <!--
          slot props
          1. <slot :자식데이터="자식데이터"></slot>
          2. 부모는 <template v-slot:default="작명" > 후에 {{ 작명.자식데이터 }} 
          <template v-slot:default="작명"> <span>{{ 작명.data }}</span> </template>
        -->
        
      </FilterBox>
    </div>
  </div>

  <!--  Tab_2 ) Write 글작성페이지 -->
  <div v-if="step===2">
    <div class="upload-image" :class="selectFilter" :style="`background-image: url(${imgUrl})`"></div>
    <div class="write">
      <textarea @input="$emit('write', $event.target.value)" class="write-box" placeholder="write hear!"></textarea>
    </div>
  </div>  
    
</div>
</template>
    
<script>
import PostArea from './PostArea.vue'
import FilterBox from './FilterBox.vue'

export default {
    name: 'ContainerA',
    data(){
      return {
        filters : [ "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", 
                    "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", 
                    "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],
        selectFilter : ''
      }
    },
    components : {
      PostArea,
      FilterBox
    },
    props : {
      myData : Array,
      step : Number,
      imgUrl : String,
      postContent : String
    },
    mounted() {
        this.emitter.on('adaptFilter', (f)=> {
          this.selectFilter = f; 
        })
    }
}
</script>

<style>
.upload-image{
  width: 100%;
  height: 450px;
  background-size : cover;
}
.filters{
  overflow-x:scroll;
  white-space: nowrap;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
.filters::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}

</style>
