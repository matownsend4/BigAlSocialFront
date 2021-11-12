function getPosts(){
    const allPostsUrl = "https://localhost:7200/api/posts";

    fetch(allPostsUrl).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "<ul>";
        json.slice().reverse().forEach((post)=>{
            html += "<li><div class = \"avatar\"></div><span>" + "&emsp;" + post.postID + "&emsp;" +
            post.postText + "</span></li>";
        })
        html += "</ul>";
        document.getElementById("posts").innerHTML = html;
        console.log(json);
    }).catch(function(error){
        console.log(error);
    });  
}

function postStatus(){
    const postUrl = "https://localhost:7200/api/posts";
    const text = document.getElementById("post").value;
    const date = document.getElementById("dateTime").innerHTML = new Date();

    fetch(postUrl, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postText: text,
            stamp: date
        })
    })
    .then((response)=>{
        console.log(response);
        getPosts();
    })
}


function editStatus(){
    const id = document.getElementById("edit").value;
    const putUrl = "https://localhost:7200/api/posts/" + id;
    const text = document.getElementById("update").value;
    // const date = document.getElementById("dateTime").innerHTML = new Date();

    fetch(putUrl, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postID: parseInt(id),
            postText: text
            // stamp: date
        })
    })
    .then((response)=>{
        console.log(response);
        getPosts();
    })
}

function deleteStatus(){
    const text = document.getElementById("delete").value;
    const deleteUrl = "https://localhost:7200/api/posts/" + text;
   // postID: parseInt(text);

    fetch(deleteUrl, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postID: parseInt(text)
            // stamp: date
        })

    })
    .then((response)=>{
        console.log(response);
        getPosts();
    })
}