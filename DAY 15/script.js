const images = [
    "images/African heritage.jpg",
    "images/Art.jpg",
    "images/banig.jpg",
    "images/download (1).jpg",
    "images/download (10).jpg",
    "images/download (11).jpg",
    "images/download (12).jpg",
    "images/download (13).jpg",
    "images/download (14).jpg",
    "images/download (2).jpg",
    "images/download (3).jpg",
    "images/download (4).jpg",
    "images/download (5).jpg",
    "images/download (6).jpg",
    "images/download (7).jpg",
    "images/download (8).jpg",
    "images/download (9).jpg",
    "images/download.jpg",
    "images/Hawassa, Ethiopia_.jpg",
    "images/Karaba et la couronne d'Afro - Maurelle Epiphania.jpg",
    "images/Maggie Steber _ Beyond the Horizon_ Adventures in Faraway Lands _ Mali.jpg",
    "images/reality___.jpg",
    "images/Serena & Lily Bazaar.jpg",
    "images/The truth behind the mask_.jpg",
    "images/Zulu shield_.jpg"
];

async function load_blog_post() {
    const blog_data = await fetch("https://jsonplaceholder.typicode.com/posts");
    const blog_parse = await blog_data.json();

    blog_parse.forEach((post, index) => {
        if (index < images.length) {
            post.image = images[index];
        }
    });

    blog_parse.forEach(post => {
        const imageHtml = post.image ? `<img src="${post.image}" alt="${post.title}" style="max-width:300px;"><br>` : "";
        myDisplayer(`<h3>${post.title}</h3>${imageHtml}<p>${post.body}</p><hr>`);
    });
}

function myDisplayer(text) {
    document.getElementById("demo").innerHTML += text;
}

load_blog_post();
