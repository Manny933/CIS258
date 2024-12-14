const HouseModel = require("../models/house");

const getHouseInfo = async (req, res) => {


    const allHouses = await HouseModel.find();


    let houses = [];


    allHouses.forEach((house) => {

        houses.push({
            id: house._id,
            street: house.houseInfo.address.street,
            city: house.houseInfo.address.city,
            country: house.houseInfo.address.country,
            description: house.houseInfo.description,
            askingPrice: house.houseInfo.askingPrice,
            image: house.houseInfo.image
        });

    });

    //console.log("Populated houses array:", houses); 

    res.render("index", { houses, isPopulated: true });

};

const addHouse = (req, res) => {
    const house = {
        houseInfo: {
            address: {
                street: "456 Apple Street",
                city: "Appleton",
                country: "USA"
            },
            description: "A 2-bedroom house in a quiet neighborhood.",
            askingPrice: 250000,
            image: null
        },
        bids: []
    };
    console.log(house);

    (async () => {
        const newHouse = new HouseModel(house);
        try {
            await newHouse.save();
            console.log("New house added:", newHouse);
            res.redirect("/");
        } catch (error) {
            console.log(error);
        }
    })();



};

const deleteHouse = async (req, res) => {

    const houseId = req.params.id;

    console.log("Deleting house with ID:", houseId);



    await HouseModel.findByIdAndDelete(houseId);


    res.redirect('/');

};





module.exports = {
    getHouseInfo,
    addHouse,
    deleteHouse,
};
