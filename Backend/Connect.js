const mongoose = require('mongoose');
async function main()
{
   await mongoose.connect(`mongodb+srv://anushkashukla3003:${process.env.MONGODB_CONNECTION_PASSWORD}@users.qo7sn4x.mongodb.net/`);
}
module.exports=main; 
// mongodb://localhost:27017