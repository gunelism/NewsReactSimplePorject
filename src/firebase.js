import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBdhaoJk6lpHnySqSV4_kkPRMFV34MJEHM",
    authDomain: "nbaproject-aac87.firebaseapp.com",
    databaseURL: "https://nbaproject-aac87.firebaseio.com",
    projectId: "nbaproject-aac87",
    storageBucket: "nbaproject-aac87.appspot.com",
    messagingSenderId: "640277219924"
  };

firebase.initializeApp(config);
const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach(childSnapshot => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    });
    return data;
}

export {
    firebase,
    firebaseDB,
    firebaseArticles,
    firebaseTeams,
    firebaseVideos,
    firebaseLooper
}