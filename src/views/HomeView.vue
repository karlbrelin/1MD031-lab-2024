<template>
<div>
    <div>
    <h1>Burgers</h1>
    <Burger v-for="burger in burgers"
            v-bind:burger="burger" 
            v-bind:key="burger.name"/>
    </div>
    <div id="map" v-on:click="addOrder">
    click here
    </div>
</div>

        <header>
          <img src="\img\header.jpg"> 
          <h1>Välkommen till BurgerOnline</h1>
        </header>
        
        <main>
            <section class="Burgersection"> 
                <h3>Våra Burgers</h3>
                <p>This is the exclusive burgers we at BurgerOnline offer to our customers</p>
                
              <div class="wrapper">
                <div v-for="burger in burgers" :key="burger.name" class="burgeroption" style="display: inline-block;">
                  <h3>{{ burger.name }}</h3>
                  <img :src="burger.url" style="width: 200px; height: 200px;">
                  <ul>
                    <li>{{ burger.kCal }} kCal</li>
                    <li v-if="burger.lactose" class="allergies">Lactose</li>
                    <li v-if="burger.gluten" class="allergies">Gluten</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section id="customerinformation">

                <h3>Customer information</h3>
                <p>Neccesary information</p>
                
                <p>Full name: {{ fullName }}</p>
                <input v-model="fullName" placeholder="First- and Last name" required="required"/>

                <p>E-mail: {{ eMail }}</p>
                <input v-model="eMail" placeholder="E-Mail adress" required="required"/>

                <p>Street: {{ streetName }}</p>
                <input  v-model="streetName" placeholder="Street name" required="required"/>

                <p>House: {{ houseNumber }}</p>
                <input  v-model.number="House" placeholder="House number" required="required"/>

                
                  <p>
                    <label for="recipient">Payment option</label><br>
                  </p>
                  <div> 
                    <select id="recipient" name="rcp" >
                        <option>Swish</option>
                        <option selected>Debit</option>
                        <option>Klarna</option>
                        <option>Cash</option>
                    </select>
                  </div>

                <p>Gender</p>
                <input type="radio" id="Male" name="Gender" value="Male">
                <label for="Male">Male</label><br> 

                <input type="radio" id="Female" name="Gender" value="Female">
                <label for="Female">Female</label><br>

                <input type="radio" id="Non-binary" name="Gender" value="Non-binary">
                <label for="Non-binary">Non-binary</label><br> 

                <input type="radio" id="Other" name="Gender" value="Other">
                <label for="Other">Other</label><br> 
                
            </section><br>

            <button type="submit">
                <img src="\img\cartoon-illustration-pepperoni-pizza-slice-image-png-7358116966795710nmjkar8to.png" height="20px">
                Send Info
            </button>
            
        </main>
        <hr> 
        <footer style="text-align: center;">&copy; BurgerOnline 2024</footer>
</template>

<script>
import Burger from '../components/OneBurger.vue'
import io from 'socket.io-client'
import menu from '../assets/menu.json'

const socket = io("localhost:3000");


function MenuItem(name, kCal, url, lac, glu) {
    this.name = name; 
    this.kCal = kCal;
    this.img = url;
    this.lactose = lac;
    this.gluten = glu;

}

const item1 = new MenuItem('Burgare utan äckelpäckel', 750 , "/img/krabbypat.jpg", true, true);
const item2 = new MenuItem('Parisare', 450 , "/img/parissare.jpeg", false, true);
const item3 = new MenuItem('Burgare med äckelpäckel', 1100 , "/img/äckelpäckel.jpeg", true, true);

const oldMenu = [item1, item2, item3];




export default {
  name: 'HomeView',
  components: {
    Burger
  },
  data: function () {
    return {
      burgers: menu
    }
  },
  methods: {
    getOrderNumber: function () {
      return Math.floor(Math.random()*100000);
    },
    addOrder: function (event) {
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};
      socket.emit("addOrder", { orderId: this.getOrderNumber(),
                                details: { x: event.clientX - 10 - offset.x,
                                           y: event.clientY - 10 - offset.y },
                                orderItems: ["Beans", "Curry"]
                              }
                 );
    }
  }
}
</script>

<style>
  #map {
    width: 300px;
    height: 300px;
    background-color: red;
  }

  @import url('https://fonts.googleapis.com/css2?family=Agbalumo&family=Cormorant:wght@700&display=swap');


  header {
  display: flex; 
  overflow: hidden;
  justify-content: center;
  align-items: center;
  position: relative;  
  width: 100%;
  height: 300px;
}

header img {
  width: 100%;  
  height: auto; 
  position: absolute; 
  top: 0;
  left: 0;
  z-index: -1; 
  opacity: 0.8;
}

header h1 {
  font-size: 3rem;
  text-align: center;  
}


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

.wrapper {
    display: grid;
    grid-gap: 50px;
    grid-template-columns: 200px 200px 200px;
}

.burgeroptions {
    margin: 15px;
    padding: 10px;
}

#customerinformation {
    padding: 15px;
    border: dashed black;
}

button:hover {
    background-color: green;
    cursor: crosshair;
 }

button {
    margin-bottom: 25px;
}

input:hover {
    cursor: crosshair;
}

#recipient:hover {
    cursor: crosshair;
}

section {
    margin: 25px;
}


</style>