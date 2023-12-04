const mongoose = require('mongoose');

async function main(){
  await mongoose.connect('mongodb+srv://NandoStadler:Stadler2808@cluster0.afwxw2y.mongodb.net/escribo');
}

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

main().catch((err) => console.log(err)); 

module.exports = mongoose;
