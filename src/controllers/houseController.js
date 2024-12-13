const HouseModel = require("../models/house"); 

const getHouseInfo = async (req, res) => {
    
        
        const allHouses = await HouseModel.find();
        console.log("All houses from DB:", allHouses);  

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

        console.log("Populated houses array:", houses); 

        res.render("index", { houses, isPopulated: houses.length > 0});
    
};


module.exports = {
    getHouseInfo
};
