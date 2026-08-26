const postsData = [
    { image: "images/African heritage.jpg", category: "Heritage" },
    { image: "images/Art.jpg", category: "Art" },
    { image: "images/banig.jpg", category: "Culture" },
    { image: "images/download (1).jpg", category: "Culture" },
    { image: "images/download (10).jpg", category: "Stories" },
    { image: "images/download (11).jpg", category: "Stories" },
    { image: "images/download (12).jpg", category: "Diaspora" },
    { image: "images/download (13).jpg", category: "Diaspora" },
    { image: "images/download (14).jpg", category: "Roots" },
    { image: "images/download (2).jpg", category: "Art" },
    { image: "images/download (3).jpg", category: "Heritage" },
    { image: "images/download (4).jpg", category: "Music" },
    { image: "images/download (5).jpg", category: "Culture" },
    { image: "images/download (6).jpg", category: "Stories" },
    { image: "images/download (7).jpg", category: "Roots" },
    { image: "images/download (8).jpg", category: "Art" },
    { image: "images/download (9).jpg", category: "Heritage" },
    { image: "images/download.jpg", category: "Culture" },
    { image: "images/Hawassa, Ethiopia_.jpg", category: "Heritage" },
    { image: "images/Karaba et la couronne d'Afro - Maurelle Epiphania.jpg", category: "Art" },
    { image: "images/Maggie Steber _ Beyond the Horizon_ Adventures in Faraway Lands _ Mali.jpg", category: "Stories" },
    { image: "images/reality___.jpg", category: "Diaspora" },
    { image: "images/Serena & Lily Bazaar.jpg", category: "Culture" },
    { image: "images/The truth behind the mask_.jpg", category: "Roots" },
    { image: "images/Zulu shield_.jpg", category: "Heritage" }
];

async function load_blog_post() {
    const blog_data = await fetch("https://jsonplaceholder.typicode.com/posts");
    const blog_parse = await blog_data.json();

    const postsWithImages = blog_parse
        .filter((_, index) => index < postsData.length)
        .map((post, index) => ({
            ...post,
            image: postsData[index].image,
            category: postsData[index].category
        }));

    const cardsHtml = postsWithImages.map((post, i) => `
        <article class="post-row">
            <div class="post-row-content">
                <span class="post-row-badge">${post.category}</span>
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <span class="post-row-meta">Aug ${20 + (i % 9)}, 2026 · ${3 + (i % 6)} min read</span>
            </div>
            <div class="post-row-img">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
            </div>
        </article>
    `).join("");

    document.getElementById("demo").innerHTML = cardsHtml;
}

load_blog_post();
