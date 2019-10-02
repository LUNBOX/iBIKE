const accountS = 'AC77a4a267288c246bc14f197ca0a74c4c';
const authT= 'c32b41ac65006ed442809fbdb01d6d33';
const c = require('twilio')(accountS, authT);

client.messages
  .create({
     body: 'iBike has detected user Declan has been in an accident please try and contact me',
     from: '+13462487501',
     to: '+353871357817'
   })

