let db = firebase.database();
let ref = db.ref("member");
let refp = db.ref("posts");



// 設定按下去的按鈕會觸動
let searchBtn= document.getElementById("searchBtn");
searchBtn.addEventListener('click',searchByData);



// 抓選取的value
let sByTag= document.getElementById("SearchByTag");
let search;
sByTag.addEventListener('change', (e)=>{
    search = e.target.value;
    console.log(search);
})


// 抓輸入的email
let sByF= document.getElementById("searchFriendEmail");
let searchF;
sByF.addEventListener('change', (e)=>{
    searchF = e.target.value;
    console.log(searchF);
})






function searchByData () {

    document.getElementById('showPostResult').innerHTML = "";

    let y = searchF+search;
    console.log(y);

    refp.on('child_added', function(snapshot) {
        // console.log(snapshot.val().article_tag);
        if (search === snapshot.val().article_tag && !searchF) {
            console.log(snapshot.val().article_content);
            let myArticleTitle = document.createElement('span');
            myArticleTitle.textContent = snapshot.val().article_title;
            myArticleTitle.classList.add("articleTitle");

            let myArticleContent = document.createElement('span');
            myArticleContent.textContent = snapshot.val().article_content;
            myArticleContent.classList.add("articleContent");
            let myArticleTag = document.createElement('span');
            myArticleTag.textContent = snapshot.val().article_tag;
            myArticleTag.classList.add("articleTag");

            let myArticleTime = document.createElement('span');
            myArticleTime.textContent = snapshot.val().created_time;
            myArticleTime.classList.add("articleTime");

            let myArticleAuthor = document.createElement('span');
            myArticleAuthor.textContent = snapshot.val().author;
            myArticleAuthor.classList.add("articleAuthor");

            let myHr = document.createElement('p');
            myHr.classList.add("pHr");
            

            document.getElementById('showPostResult').appendChild(myArticleTitle);
            document.getElementById('showPostResult').appendChild(myArticleContent);
            document.getElementById('showPostResult').appendChild(myArticleTag);
            document.getElementById('showPostResult').appendChild(myArticleTime);
            document.getElementById('showPostResult').appendChild(myArticleAuthor);
            document.getElementById('showPostResult').appendChild(myHr);
    }   else if (searchF === snapshot.val().author && !search) {
            console.log(snapshot.val().article_content);
            let myArticleTitle = document.createElement('span');
            myArticleTitle.textContent = snapshot.val().article_title;
            myArticleTitle.classList.add("articleTitle");

            let myArticleContent = document.createElement('span');
            myArticleContent.textContent = snapshot.val().article_content;
            myArticleContent.classList.add("articleContent");
            let myArticleTag = document.createElement('span');
            myArticleTag.textContent = snapshot.val().article_tag;
            myArticleTag.classList.add("articleTag");

            let myArticleTime = document.createElement('span');
            myArticleTime.textContent = snapshot.val().created_time;
            myArticleTime.classList.add("articleTime");

            let myArticleAuthor = document.createElement('span');
            myArticleAuthor.textContent = snapshot.val().author;
            myArticleAuthor.classList.add("articleAuthor");
            
            let myHr = document.createElement('p');
            myHr.classList.add("pHr");

            document.getElementById('showPostResult').appendChild(myArticleTitle);
            document.getElementById('showPostResult').appendChild(myArticleContent);
            document.getElementById('showPostResult').appendChild(myArticleTag);
            document.getElementById('showPostResult').appendChild(myArticleTime);
            document.getElementById('showPostResult').appendChild(myArticleAuthor);
            document.getElementById('showPostResult').appendChild(myHr);
    }   
        else if (y === snapshot.val().author_tag ) {
            console.log("Hello");

            console.log(snapshot.val().article_content);
            let myArticleTitle = document.createElement('span');
            myArticleTitle.textContent = snapshot.val().article_title;
            myArticleTitle.classList.add("articleTitle");

            let myArticleContent = document.createElement('span');
            myArticleContent.textContent = snapshot.val().article_content;
            myArticleContent.classList.add("articleContent");
            let myArticleTag = document.createElement('span');
            myArticleTag.textContent = snapshot.val().article_tag;
            myArticleTag.classList.add("articleTag");

            let myArticleTime = document.createElement('span');
            myArticleTime.textContent = snapshot.val().created_time;
            myArticleTime.classList.add("articleTime");

            let myArticleAuthor = document.createElement('span');
            myArticleAuthor.textContent = snapshot.val().author;
            myArticleAuthor.classList.add("articleAuthor");
            
            let myHr = document.createElement('p');
            myHr.classList.add("pHr");

            document.getElementById('showPostResult').appendChild(myArticleTitle);
            document.getElementById('showPostResult').appendChild(myArticleContent);
            document.getElementById('showPostResult').appendChild(myArticleTag);
            document.getElementById('showPostResult').appendChild(myArticleTime);
            document.getElementById('showPostResult').appendChild(myArticleAuthor);
            document.getElementById('showPostResult').appendChild(myHr);
    }  
    
        else {
            
    }

    });


}

// let searchFBtn= document.getElementById("searchFBtn");



// searchFBtn.addEventListener('click',searchByFriendEmail);

function searchByFriendEmail () {
    console.log(searchF);
    document.getElementById('showPostResult').innerHTML = "";

    refp.on('child_added', function(snapshot) {
        // console.log(snapshot.val().article_tag);
        if (searchF === snapshot.val().author) {
            console.log(snapshot.val().article_content);
            let myArticleTitle = document.createElement('span');
            myArticleTitle.textContent = snapshot.val().article_title;
            myArticleTitle.classList.add("articleTitle");

            let myArticleContent = document.createElement('span');
            myArticleContent.textContent = snapshot.val().article_content;
            myArticleContent.classList.add("articleContent");
            let myArticleTag = document.createElement('span');
            myArticleTag.textContent = snapshot.val().article_tag;
            myArticleTag.classList.add("articleTag");

            let myArticleTime = document.createElement('span');
            myArticleTime.textContent = snapshot.val().created_time;
            myArticleTime.classList.add("articleTime");

            let myArticleAuthor = document.createElement('span');
            myArticleAuthor.textContent = snapshot.val().author;
            myArticleAuthor.classList.add("articleAuthor");
            
            let myHr = document.createElement('p');
            myHr.classList.add("pHr");

            document.getElementById('showPostResult').appendChild(myArticleTitle);
            document.getElementById('showPostResult').appendChild(myArticleContent);
            document.getElementById('showPostResult').appendChild(myArticleTag);
            document.getElementById('showPostResult').appendChild(myArticleTime);
            document.getElementById('showPostResult').appendChild(myArticleAuthor);
            document.getElementById('showPostResult').appendChild(myHr);
        }

    });


}
