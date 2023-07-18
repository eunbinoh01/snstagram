<template>
<div class="post">
    <div class="post-header">
      <div class="profile" :style="`background-image: url(${myData.userImage})`"></div>
      <span class="profile-name">{{ myData.name }}</span>
    </div>
    <div 
         class="post-body" 
        :class="myData.filter" 
        :style="`background-image : url(${myData.postImage})`"
        @click="$store.commit('pushLike',myData)"
    ></div>
    <div class="post-content">
      <p>
        <img src="../assets/like_before.png" class="like_icon" :class="['hidden' , myData.liked == true]" 
          @click="$store.commit('pushLike',myData)"
        />
        <img src="../assets/like_after.png" class="like_icon" :class="['' , myData.liked == true]" 
          @click="$store.commit('pushLike',myData)"
        />
        {{ myData.likes }} Likes
      </p>
      <p><strong>{{ myData.name }}</strong> {{ myData.content }}</p>
      <p class="date">{{ myData.date }}</p>
    </div>
</div> 
</template>
        
<script>

export default {
    name: 'PostArea',
    props : {
      myData : Object
    }
}
</script>

<style>
.post {
  width: 100%;
}
.profile {
  background-image: url("https://picsum.photos/100?random=0");
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
}
.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}
.post-header {
  height: 30px;
  padding: 10px;
}
.post-body {
  background-image: url("https://picsum.photos/600?random=0");
  height: 450px;
  background-position: center;
  background-size: cover;
}
.post-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}
.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
} 
.like_icon {
  width: 15px;
  margin-top: 5px;
  cursor: pointer;
}
.hidden {
  display: none;
}
</style>
        