async function load_blog_post() {
    const blog_data = await fetch ("https://jsonplaceholder.typicode.com/posts");
    const blog_parse = await blog_data.json();

    blog_parse.forEach(post => {
        myDisplayer(`<h3>${post.title}</h3><p>${post.body}</p><hr>`);
    });
    
}

function myDisplayer(text){
    document.getElementById('demo').innerHTML += text;
}

load_blog_post();