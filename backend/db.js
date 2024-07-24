// const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://sinojiyaarchit:abcde@cluster0.tfbxfqd.mongodb.net/gofoodmern?retryWrites=true&w=majority';

// const mongoDB = async () => {
//     try {
//         await mongoose.connect(mongoURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('Database Connected');

//         const fetched_data = mongoose.connection.db.collection("food_items");
//         fetched_data.find({}).toArray(async function (err, data){
//             const foodCategory = await mongoose.connection.db.collection("foodCategory");
//             foodCategory.find({}).toArray(function (err, catData){
//                 if(err){
//                     console.log(err);
//                 }
//                 else{
//                     global.food_items = data;
//                     global.foodCategory = catData;
//                     console.log(global.food_items); // Move the console.log here
//                 }
//             })
//         });
//     }
//      catch (err) {
//         console.error(err);
//     }
// };

// module.exports = mongoDB;

const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://sinojiyaarchit:abcde@cluster0.tfbxfqd.mongodb.net/gofoodmern?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database Connected');

        const fetched_data = mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();

        const foodCategory = mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();

        global.food_items = data;
        global.foodCategory = catData;

        //console.log('Food Items:', global.food_items); // Logging here ensures it is set
        //console.log('Food Categories:', global.foodCategory); // Logging here ensures it is set
    } catch (err) {
        console.error(err);
    }
};

module.exports = mongoDB;
