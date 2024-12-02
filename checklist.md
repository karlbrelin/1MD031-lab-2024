# Checklist

Before you submit the final version of your labs, make sure that your project fullfills all of the tasks that will be added to this checklist.

## 00 Introduction

- [x] Install an IDE on your system

## 01 Git

- [x] Fork and clone the 1md031-lab-21 repository

## 02 HTML

Your index.html file contains:
- [x] A headline
- [x] A section to select burgers that contains at least three items. Each item has:
    - [x] A name
    - [x] An image
    - [x] Information about allergies 
- [x] A section to collect customer information:
    - [x] First- and Last Name (in one field)
    - [x] E-Mail Address
    - [x] Street
    - [x] House Number (only allowing numbers in this field)
    - [x] Gender (male, female, do not wish to provide as radio buttons)
- [x] A button to place the order
- [x] Ensure the website loads when opening http://localhost:5173/

## 03 CSS

The style.css file contains:
- [x] A rule to make the allergy information bold
- [x] Different text and background color for the two different sections (burger selection and customer information)
- [x] Change the cursor when hovering over the order button
- [x] Adds margins to the sections and the order button
- [x] Add a border to the two sections
- [x] Create a header that places an image behind the headline
- [x] Use a grid layout for the burger selection section


## 04 JavaScript and Vue

- [x] You have a menu.json file which contains at least three different burgers with respective attributes

Your HomeView.vue file:
- [x] ... contains a MenuItem constructor (that is not used)
- [x] ... loads the information from the menu.json object and inserts the information to the burger selection section
- [x] ... allows the customer to click in the interactive map to select delivery location
- [x] ... has an order button that sends the information from the text boxes, the gender, all items on the order, and the delivery location to the server (to be realyed to the dispatcher)

Your OneBurger.vue component:
- [x] ... allows adding and removing burgers from the order
- [x] ... only displays allergy information if relevant (either only if it contains gluten or lactose, or only if it's gluten or lactose free)

Your Dispatcher.vue file:
- [x] ... shows for every order :
    - [x] a location on the map
    - [x] the order information
    - [x] the customer information

## Optional
- [ ] Only allow the order to be sent if all necessary information are provided
- [ ] Display receipt on the customer page as well
- [ ] Allow the dispatcher to handle orders by providing buttons next to every order that can switch the order status to "in preparation" and "done"
- [ ] Display the order status to the customer and update it in the customer view if updated by the dispatcher
- [ ] Show the order status for the customer as well.
- [ ] Find a better visualization for what orders belong to which location on the map