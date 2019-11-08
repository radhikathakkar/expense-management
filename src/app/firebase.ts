const client = require('firebase-tools');

const firebaseConfig = {
    apiKey: 'AIzaSyC1I6ti1_g9CA23WeT3lqime6fvKo3twS4',
    databaseURL: 'https://expense-management-39d80.firebaseio.com',
    projectId: 'expense-management-39d80',
    storageBucket: 'expense-management-39d80.appspot.com',
    messagingSenderId: '586806847209',
    appId: '1:586806847209:web:01b0110300e76dfc2cb278',
    measurementId: 'G-JK1282X424'
  };


client.list().then((data) => {
  console.log(data);
}).catch((err) => {
  console.log(err);
});

// client.deploy({
//   project: 'myfirebase',
//   token: process.env.FIREBASE_TOKEN,
//   force: true,
//   cwd: '/path/to/project/folder'
// }).then(function() {
//   console.log('Rules have been deployed!')
// }).catch(function(err) {
//   // handle error
// });


