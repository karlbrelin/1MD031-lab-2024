<template>

  <div v-for="burger in burgers" :key="burger.name" class="burgeroption" style="display: inline-block;">
    <h3>{{ burger.name }}</h3>
    <img :src="burger.url" style="width: 200px; height: 200px;">
    <ul>
      <li>{{ burger.kCal }} kCal</li>
      <li v-if="burger.lactose" class="allergies">Lactose</li>
      <li v-if="burger.gluten" class="allergies">Gluten</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'OneBurger',
  props: {
    burger:{
      type: Object,
      Required: true
    } 
    
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
    font-family: Arial;
}

.allergies {
    font-weight: bold;
}

.Burgersection {
    
    padding-left: 15px;
    background-color: black;
    color: white;
    border: 2px dashed white;

}


.burgeroptions {
    margin: 15px;
    padding: 10px;
}
</style>