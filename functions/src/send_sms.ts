const accountSid = 'AC77a4a267288c246bc14f197ca0a74c4c';
const authToken = 'c32b41ac65006ed442809fbdb01d6d33';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'iBike has detected user Declan has been in an accident please try and contact me',
     from: '+13462487501',
     to: '+353871357817'
   })
  .then(messages => console.log(message.sid));