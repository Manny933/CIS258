const HouseModel = require("../models/house");

const getHouseInfo = async (req, res) => {


    const allHouses = await HouseModel.find()


    let houses = [];


    allHouses.forEach((house) => {

        houses.push({
            id: house._id,
            street: house.houseInfo.address.street,
            city: house.houseInfo.address.city,
            country: house.houseInfo.address.country,
            description: house.houseInfo.description,
            askingPrice: house.houseInfo.askingPrice,
            image: house.houseInfo.image,
            name: house.bids.name,
            amount: house.bids.amount
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

const getBids = async (req, res) => {
   
   
        
            const houseId = req.params.id;  
            
            const house = await HouseModel.findById(houseId).populate('bids');  
    
          
    
           // console.log("Fetched House with Bids:", house);  
    
            
            res.render('houseBids', { house: house });
        
    };
    

const addBid = async (req, res) => {
    const houseId = req.params.id;  

    
    const { bidderName, bidAmount } = req.body;

    try {
        const house = await HouseModel.findById(houseId);  

        if (!house) {
            return res.status(404).send("House not found");
        }

        
        if (!bidderName || !bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
            return res.status(400).send("Invalid form data.");
        }

       
        house.push({ name: bidderName, amount: bidAmount });

   
        await house.save();

       
        res.redirect(`/house/${houseId}/bids`);
    } catch (err) {
        console.error("Error adding bid to house:", err);
        res.status(500).send("Error adding bid to house");
    }
};




module.exports = {
    getHouseInfo,
    addHouse,
    deleteHouse,
    getBids,
    addBid,
};
