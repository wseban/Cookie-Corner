const connection = require("../config/connection");
const {Food} = require("../models");


const seedFood = [
    {
        name: "Brown Chocolate Chip Cookie",
        price: 7.5,
        ingredients: "Browned butter, Egg, Brown sugar, Baking soda, Vanilla",
        picture: "../assets/BrownChocolateChipCookie.png" 

    },
    {
        name: "Cherry Cheesecake Cookie",
        price: 10,
        ingredients: "Cherry pie filling, Egg, White sugar, Baking soda, Vanilla",
        picture: "../assets/CherryCheesecakeCookie.png" 

    },
    {
        name: "Chocolate Cookie",
        price: 5,
        ingredients: "Chocolate chips, Egg, White sugar, Baking soda, Vanilla",
        picture: "../assets/ChocolateCookie.png" 

    },
    {
        name: "Peanut Butter Cookie",
        price: 7.5,
        ingredients: "Creamy full-fat peanut butter, Egg, White sugar, Baking soda, Vanilla",
        picture: "../assets/PeanutButterCookie.png" 

    },
    {
        name: "Walnut Cookie",
        price: 5,
        ingredients: "Chopped walnuts, Egg, White sugar, Baking soda, Vanilla",
        picture: "../assets/WalnutCookie.png" 

    }
];

connection.once("open", async () => {
    await Food.deleteMany({});
    await Food.insertMany(seedFood);

    console.timeEnd('seeding complete 🌱');
    process.exit(0);
});

