<template>

        <header>
          <img src="\img\header.jpg"> 
          <h1>Välkommen till BurgerOnline</h1>
        </header>
        
        <main>
            <section class="Burgersection"> 
                <h3>Våra Burgers</h3>
                <p>This is the exclusive burgers we at BurgerOnline offer to our customers</p>
                
              <div class="wrapper">
                  <Burger v-for="burger in burgers"
                  v-bind:burger="burger" 
                  v-bind:key="burger.name"
                  v-on:orderedBurger="addToOrder($event)"/>
              </div>
            </section>
            
            <section id="customerinformation">

                <h3>Customer information</h3>
                <p>Neccesary information</p>
                
                <p>Full name: {{ fullName }}</p>
                <input v-model="fullName" placeholder="First- and Last name" required="required"/>

                <p>E-mail: {{ eMail }}</p>
                <input v-model="eMail" placeholder="E-Mail adress" required="required"/>

                
                <div id="container">
                  <div id="map" v-on:click="setLocation">
                    <div class="target" v-bind:style="{ top: location.y + 'px', left: location.x + 'px' }">
                      T
                    </div>
                  </div>
                </div>

                <p>Payment option {{ paymentOption }}</p>

                <select v-model="paymentOption">
                  <option>Swish</option>
                  <option>Debit</option>
                  <option>Klarna</option>
                  <option>Cash</option>
                </select>

                <p>Gender: {{ gender }}</p>
                <input type="radio"  value="Male" v-model="gender">
                <label for="Male">Male</label><br> 

                <input type="radio"  v-model="gender" name="Gender" value="Female">
                <label for="Female">Female</label><br>

                <input type="radio"  v-model="gender" name="Gender" value="Non-binary">
                <label for="Non-binary">Non-binary</label><br> 

                <input type="radio"  v-model="gender" name="Gender" value="Other">
                <label for="Other">Other</label><br> 

                
            </section><br>



            <button type="submit" v-on:click="printOrder">
                <img src="\img\cartoon-illustration-pepperoni-pizza-slice-image-png-7358116966795710nmjkar8to.png" height="20px">
                Order
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
      burgers: menu,
      paymentOption: "Debit",
      fullName: "",
      eMail: "",
      streetName: "",
      houseNumber: "",
      gender: "",
      orderedBurgers:{},
      location: {x: 0, y: 0}
    }
  },
  methods: {
    getOrderNumber: function () {
      return Math.floor(Math.random()*100000);
    },
    addOrder: function (event) {
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};

      this.location.x = event.clientX - offset.x;
      this.location.y = event.clientY - offset.y;


      },

      setLocation: function (event) {

        var offset = { x: event.currentTarget.getBoundingClientRect().left,
                   y: event.currentTarget.getBoundingClientRect().top };

        this.location.x = event.clientX - offset.x;
        this.location.y = event.clientY - offset.y;
        
        console.log("koordinater ändrade till", this.location.x, this.location.y)
    },

    addToOrder: function (event) {
      this.orderedBurgers[event.name] = event.amount;
    },



    printOrder: function () {

        console.log("Full Name:", this.fullName);
        console.log("Email:", this.eMail);
        console.log("Payment Option:", this.paymentOption);
        console.log("Gender:", this.gender);
        console.log("ordered burger", this.orderedBurgers)

        socket.emit("addOrder", { orderId: this.getOrderNumber(),
                                details: { x: this.location.x, y: this.location.y },
                                orderItems: this.orderedBurgers,
                                personalDetails: {name: this.fullName, 
                                                  mail: this.eMail, 
                                                  payment: this.paymentOption, 
                                                  gender: this.gender}
                              }
                 );
    }
  }
}
</script>

<style>

   
  #map {
    background: url("img/polacks.jpg");
    background-size: auto;
    width: 1920px;
    height: 1078px;
    position: relative;
      
  }

  #map:hover{
    cursor: crosshair;
  }

  #container {
    margin: 1em;
    overflow: hidden;
    overflow: scroll;
  }

  .target {
    position: absolute;
    text-align: center;
    background-color: brown;
    height: 15px;
    width: 15px;
    border-radius: 50%
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
    
    padding-left: 1em;
    background-color: black;
    color: white;
    border: 2px dashed white;

}

.wrapper {
    display: grid;
    grid-gap: 100px;
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