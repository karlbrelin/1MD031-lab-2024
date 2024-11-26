<template>

  <div class="burgeroption" style="display: inline-block;">
    <h3>{{ burger.name }}</h3>
    <img :src="burger.url" style="width: 200px; height: 200px;">
    <ul>
      <li>{{ burger.kCal }} kCal</li>
      <li v-if="burger.lactose" class="allergies">Lactose</li>
      <li v-if="burger.gluten" class="allergies">Gluten</li>
    </ul>
    <p>Antal beställda: {{ amountOrdered }}</p>
    <button v-on:click="changeAmount('minus')">-</button>
    <button v-on:click="changeAmount('plus')">+</button>

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
    
  },

  data: function () {
  return {
    amountOrdered: 0,
  };
 },
 methods: {

  changeAmount (action) {

    if (action === "minus" && this.amountOrdered > 0) {
      this.amountOrdered--;
    }
    if (action === "plus") {
      this.amountOrdered++;
    }
    this.addBurger();
  },
  
  addBurger: function () {
    this.$emit('orderedBurger', {name: this.burger.name, 
                                amount: this.amountOrdered
                                }

    );
  }
    

 }
};

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