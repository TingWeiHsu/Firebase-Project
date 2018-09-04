
let db = firebase.database();
let ref = db.ref("member");
let searchMail= document.getElementById("searchMail");

let userKey;

let typeMail= document.getElementById("email");
let emailinfor;

let findBtn= document.getElementById("findBtn");
let addBtn= document.getElementById("add");
let textBtn= document.getElementById("textBtn");


//輸入登入區email 取得其質
typeMail.addEventListener('change', (e)=>{
    emailinfor= e.target.value;
    console.log(emailinfor);
})


let myKey;
let myEmail;
let myName;

//我的好友
let myFriend;


function logInUser () {
    console.log(emailinfor + "submit~");
    ref.on('child_added', function(snapshot) {
        console.log(snapshot.val());
        if (emailinfor === snapshot.val().user_email){
                console.log(emailinfor+"match!");
                document.querySelector(".logInTitle").style.display = "none";
                document.querySelector(".logInForm").style.display = "none";
                document.querySelector(".logInResult").style.display = "block";
                document.querySelector(".logInResult").style.color = "#F77F00";
                document.querySelector(".logInResult").style.fontWeight = "bolder";
                document.querySelector(".logInResult").style.fontSize = "xx-large";
                document.querySelector(".logInResult").innerHTML = "Hello, " + snapshot.val().user_name + "!";
                document.querySelector(".findFriendForm").style.display = "block";
                document.querySelector("#postArticle").style.display = "block";
                // myref = firebase.database().ref('member/' + snapshot.key);
                // console.log("hi" + myref);

                console.log(snapshot.key);
                console.log(snapshot.val().user_email);
                console.log(snapshot.val().friend);
                // fetch(`https://test-firebase-7198e.firebaseio.com/member/${snapshot.key}.json?`,
                // {method="GET"})
                //     .then(function(response) {
                //         console.log("hi");
                //         console.log(response);
                //         return response.json();
                //     }) 不要用這個好惹因為太麻煩了
                myKey = snapshot.key;
                myEmail = snapshot.val().user_email;
                myName = snapshot.val().user_name;
                //拿到friend物件群
                myFriend = snapshot.val().friend;
                //將物件轉換為陣列 偵測到為["-LLTSwSkhMlaiOYZNmhD"...]
                console.log(Object.keys(myFriend));
                //轉換為陣列之後可以用index
                console.log(Object.keys(myFriend)[0]);
                //轉換為陣列之後可以用index找出要找得值 偵測到為valid
                console.log(myFriend[Object.keys(myFriend)[0]]["invite-status"]);
                // let myJSON = JSON.stringify(myFriend);
                // document.querySelector("#friName").innerHTML = myJSON;

                let text="";
                let x;
                for (x in Object.keys(myFriend) ){
                    
                    idbase = Object.keys(myFriend);
                    text = Object.keys(myFriend)[x];
                    status = myFriend[Object.keys(myFriend)[x]]["invite-status"];

                    console.log(text);

                    let myOneFriend = document.createElement('div');
                    myOneFriend.classList.add(`oneFriendDiv`);
                    myOneFriend.classList.add(`oneFriendDiv${x}`);
                    let myFriendName = document.createElement('span');
                    myFriendName.setAttribute("id",`${x}`);
                    let myFriendStatus = document.createElement('input');
                    myFriendStatus.setAttribute("type", "button");

                    if (status === "valid"){
                        myFriendStatus.value = "Friend";
                    } else if (status === "pending_send"){
                        myFriendStatus.value = "Sent Request";
                    } else if (status === "pending_confirm"){
                        myFriendStatus.value = "Do you want to confirm the friend request?";
                        myFriendStatus.setAttribute("id", "clickableConfirm");
                        myFriendStatus.setAttribute("onclick", `getCorrectId(${x})`);
                        

                    } else {
                        myFriendStatus.value = status;
                    }
                    
                    //於是我的text就變成了可以找人用的id

                    ref.on('child_added', function(snapshot) {
                        //重新將資料中的key抓出來 跟現在得到的key做比較 如果等同 就做以下動作
                        console.log(text)
                        if (snapshot.key === text){
                            console.log(snapshot.val().user_name);
                            myFriendName.textContent = snapshot.val().user_name;
                        }
                    })


                    //我要放名字
                    // myFriendName.textContent = text;
                    myFriendName.style.paddingRight = "3%";
                    myOneFriend.appendChild(myFriendName);
                    myOneFriend.appendChild(myFriendStatus);
                    document.getElementById('friendList').appendChild(myOneFriend);
                }
                // console.log(text);
                // document.querySelector("#friName").innerHTML = text;
                

                findFriend();


            } else {
                document.querySelector(".failInfor").style.display = "inline-block";
            }
        })
    
};


//找到的朋友的資料
let friendKey;
let friendName;
let friendEmail;


function findFriend(){


    console.log(myKey,myEmail,myName); // 儲存到全域變數的情況下可以抓到資料了

    //抓到輸入的信箱
    searchMailValue = searchMail.value
    console.log(searchMailValue);
    //跟資料庫的信箱堆做比對 找到相對應的key
    ref.orderByChild("user_email").equalTo(searchMailValue).on("child_added", function(snapshot) {
        console.log(snapshot.val().user_name);
        
        // 抓搜尋過後這個人的所有資料
        friendKey = snapshot.key;
        friendEmail = snapshot.val().user_email;
        friendName = snapshot.val().user_name;

        userKey = snapshot.key;
        //把key交到顯示朋友的函式 純粹顯示朋友加上按鈕
        showFriend(userKey);
      });
      console.log(friendKey,friendEmail,friendName);
}

function showFriend(userKey) {
    //需要顯示朋友的html文字區
    let friendName = document.getElementById("showFriendName");
    console.log(userKey);

    ref.on('child_added', function(snapshot) {
        //重新將資料中的key抓出來 跟現在得到的key做比較 如果等同 就做以下動作
        console.log(snapshot.key)
        if (snapshot.key === userKey){
            document.querySelector(".searchResult").style.display = "block";
            console.log(snapshot.val().user_name);
            friendName.innerHTML = snapshot.val().user_name;
        }
        
  });
}

function sendToFriendList () {

    console.log(myKey);
    console.log(friendKey);
    let myRoot = firebase.database().ref('member/' + myKey + '/' + 'friend');
    myRoot.child(friendKey).set({
            "invite-status": "pending_send"  
    });

    let myFriendRoot = firebase.database().ref('member/' + friendKey + '/' + 'friend');
    myFriendRoot.child(myKey).set({
            "invite-status": "pending_confirm"  
    });

    window.location.reload();
}



//點擊按鈕啟動找朋友
findBtn.addEventListener('click', findFriend);

addBtn.addEventListener('click',sendToFriendList);


let thatGuy;

function getCorrectId(x){

    thatGuy = document.getElementById(`${x}`).innerHTML;
    console.log(thatGuy);

                        let myAnswer = document.createElement('input');
                        myAnswer.setAttribute("type", "button");
                        myAnswer.setAttribute("onclick", "acceptFriendRequest()");
                        myAnswer.classList.add("answerYes");
                        myAnswer.value = "V";
                        let myNo = document.createElement('input');
                        myNo.setAttribute("type", "button");
                        myNo.setAttribute("onclick", "removeFriendRequest()");
                        myNo.classList.add("answerNo");
                        myNo.value = "X";
                        console.log(x);

                        let content = "oneFriendDiv"+x ;
                        document.querySelector(`.${content}`).appendChild(myAnswer);
                        document.querySelector(`.${content}`).appendChild(myNo);

    
}

function removeFriendRequest () {
    //我的key
    console.log(myKey);
    console.log(thatGuy);
    console.log("走開！"); 
    //終於抓到那個傢伙的key
    let thatGuyKey;

    ref.orderByChild("user_name").equalTo(thatGuy).on("child_added", function(snapshot) {
        console.log(snapshot.key);
        thatGuyKey = snapshot.key;
    })

    console.log(thatGuyKey);

    let myRoot = firebase.database().ref('member/' + myKey + '/' + 'friend'+ '/'+ thatGuyKey);
    myRoot.remove();

    let myFriendRoot = firebase.database().ref('member/' + thatGuyKey + '/' + 'friend' +'/' + myKey);
    myFriendRoot.remove();

    window.location.reload();


}

function acceptFriendRequest () {     
    console.log(myKey);
    console.log(thatGuy);
    console.log("跟你做朋友！"); 

    let thatGuyKey;

    ref.orderByChild("user_name").equalTo(thatGuy).on("child_added", function(snapshot) {
        console.log(snapshot.key);
        thatGuyKey = snapshot.key;
    })

    console.log(thatGuyKey);



    let myRoot = firebase.database().ref('member/' + myKey + '/' + 'friend');
    myRoot.child(thatGuyKey).set({
            "invite-status": "valid"  
    });

    let myFriendRoot = firebase.database().ref('member/' + thatGuyKey + '/' + 'friend');
    myFriendRoot.child(myKey).set({
            "invite-status": "valid"  
    });

    window.location.reload();
}



let articleTitle= document.getElementById("articleTitle");
let title;

articleTitle.addEventListener('change', (e)=>{
    title = e.target.value;
    console.log(title);
})

let selectTag= document.getElementById("selectTag");
let tag;

selectTag.addEventListener('change', (e)=>{
    tag = e.target.value;
    console.log(tag);
})

let writeText= document.getElementById("writeText");
let articleC;

writeText.addEventListener('change', (e)=>{
    articleC = e.target.value;
    console.log(articleC);
})

//點擊 總之開始登陸po文
textBtn.addEventListener('click',sendPost);

function sendPost () {
    console.log("send article");
    console.log(myEmail);

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var min = today.getMinutes();
    var hour = today.getHours();
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    } 
    if(mm<10) {
        mm = '0'+mm
    } 
    today = yyyy + mm + dd + hour + min ;


    //設置那個搜尋
    console.log(`${myEmail}${tag}`)

    var newArticlerKey = firebase.database().ref().child('posts').push().key;
    console.log(newArticleKey);
    firebase.database().ref('post/' + newArticlerKey).set({
        article_content : articleC,
        article_id: newArticlerKey,
        article_tag: tag,
        article_title: title,
        author: myEmail,
        author_tag: `${myEmail}${tag}`,
        created_time: today
      });
}




//取得firebase database 

// let leadsRef = firebase.database().ref('member');
// leadsRef.on('child_added', function(snapshot) {
//     console.log(snapshot.val());
// });


// let searchMailValue;
// function findFriend(){
//     searchMailValue = searchMail.value
//     console.log(searchMailValue);
//     return searchMailValue;
// }

// console.log(searchMailValue);

// findBtn.addEventListener('click', findFriend)