

let typeName= document.getElementById("name");
let typeMail= document.getElementById("email");
let submitBtn= document.getElementById("submitBtn");
let findBtn= document.getElementById("findBtn");
let searchMail= document.getElementById("searchMail");

// function submitClick () {
//     alert("test");
//     let firebaseRef = firebase.database().ref();
//     firebaseRef.child("Text").set("Some Value");
    
// }
let name;
let emailinfor;
let searchFriend;

//偵測有填入資料
typeName.addEventListener('change', (e)=>{
    name = e.target.value;
    console.log(name);
})

typeMail.addEventListener('change', (e)=>{
    emailinfor= e.target.value;
    console.log(emailinfor);
})

//取得firebase database 
let leadsRef = firebase.database().ref('member');
leadsRef.on('child_added', function(snapshot) {
    console.log(snapshot.val());
});
// leadsRef.on('value', function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//       let childData = childSnapshot.val();
//       console.log(childData.user_email);

//     });
// });  同樣抓資料 只是方法是全部都要輪一遍 比較吃資源

function findFriend(){
    searchMail = searchMail.value;
    console.log(childData);
    console.log(searchMail);
}


function submitUserData() {
    console.log("submit");
    var newMemberKey = firebase.database().ref().child('posts').push().key;
    console.log(newMemberKey);
    firebase.database().ref('member/' + newMemberKey).set({
      user_name: name,
      user_email: emailinfor
    });

  }

