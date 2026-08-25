async function load_blog_post() {
    const blog_data = await fetch ("https://jsonplaceholder.typicode.com/posts");
    const blog_parse = await blog_data.JSON();

    blog_parse.forEach(post => {
        myDisplayer(`<h3> ${post.title}</h3> <p> ${post_body}</p> </h3>`);
    });
    
}

funct