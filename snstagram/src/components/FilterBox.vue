<template>
    <div 
        class="filter-item" 
        :class="filterNm" 
        :style="`background-image: url(${imgUrl})`"
        @click="pickFilter"
    >
        <!-- 태그안에 바인딩할때만 slot 사용가능 -->
        <slot></slot>
        <!-- slot 여러개 사용할 때-->
        <!-- <slot name="slotA"></slot>
             <slot name="slotB"></slot> -->
    </div> 
</template>
        
<script>

export default {
    name: 'FilterBox',
    methods:{
        pickFilter(){
            this.emitter.emit('adaptFilter', this.filterNm);
        }
    },
    props : {
        imgUrl : String,
        filterNm : String
    }
}
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : white;
  background-size: cover;
  background-position : center;
  cursor : pointer;
}
</style>
        