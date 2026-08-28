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
    { image: "images/Zulu shield_.jpg", category: "Heritage" },
    { image: "images/Beautiful African woman.jpg", category: "Culture" },
    { image: "images/Food ivoire.jpg", category: "Culture" },
    { image: "images/Art (1).jpg", category: "Art" },
    { image: "images/Amazon_com_ Lescafita African Statues and….jpg", category: "Heritage" },
    { image: "images/Abstract African Face Embroidery Design_ 4x4 PES File (Digital Download).jpg", category: "Art" },
    { image: "images/Mariage africain _ traditions, tenues et conseils pour bien l’organiser.jpg", category: "Heritage" },
    { image: "images/Nigerian Okra Soup Step By Step Recipe - Dream Africa.jpg", category: "Culture" },
    { image: "images/Ore àti Seth ❤️ #SO2become1.jpg", category: "Stories" },
    { image: "images/Download Warrior Silhouette Holding Spear and Shield Tribal Illustration for free.jpg", category: "Heritage" },
    { image: "images/“Holiday Gift Inspiration for Friends & Family”.jpg", category: "Diaspora" },
    { image: "images/13510867628672484.jpg", category: "Art" },
    { image: "images/27443878975956523.jpg", category: "Stories" },
    { image: "images/2885187258292727.jpg", category: "Heritage" },
    { image: "images/42502790222465702.jpg", category: "Culture" },
    { image: "images/4855512095788216.jpg", category: "Roots" },
    { image: "images/4925880839658943.jpg", category: "Music" },
    { image: "images/700450548341409638.jpg", category: "Diaspora" }
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

    const cardsHtml = postsWithImages.map((post, i) => {
        const delay = Math.min(i * 0.08, 1);
        return `
        <article class="post-row" style="animation-delay:${delay}s">
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
    `;
    }).join("");

    document.getElementById("demo").innerHTML = cardsHtml;
}

load_blog_post();

/* ─── THEME SWITCHER ─── */
const themes = {
    amber: {
        name: "Brown & Amber",
        swatches: ["#1C1917", "#F59E0B"],
        pattern: "images/Yellow African Background Design_ Stock Vector - Illustration of magazine, african_ 38733013.jpg",
        vars: {
            "--charcoal": "#1C1917",
            "--gold": "#F59E0B",
            "--terracotta": "#F59E0B",
            "--sand": "#F5F0EB",
            "--cream": "#FDFBF7",
            "--dark-olive": "#44403C",
            "--brown-mid": "#44403C",
            "--amber": "#F59E0B",
            "--amber-light": "#FEF3C7",
            "--text-muted": "#78716C",
            "--text-faint": "#94A3B8",
            "--accent-rgb": "245, 158, 11"
        }
    },
    ocean: {
        name: "Ocean Blue & Coral",
        swatches: ["#0F172A", "#FF6B6B"],
        pattern: null,
        vars: {
            "--charcoal": "#0F172A",
            "--gold": "#FF6B6B",
            "--terracotta": "#FF6B6B",
            "--sand": "#E2E8F0",
            "--cream": "#F8FAFC",
            "--dark-olive": "#1E3A5F",
            "--brown-mid": "#1E3A5F",
            "--amber": "#FF6B6B",
            "--amber-light": "#FFF1F1",
            "--text-muted": "#64748B",
            "--text-faint": "#94A3B8",
            "--accent-rgb": "255, 107, 107"
        }
    },
    purple: {
        name: "Royal Purple & Gold",
        swatches: ["#2D1B69", "#FBBF24"],
        pattern: null,
        vars: {
            "--charcoal": "#1E1B4B",
            "--gold": "#FBBF24",
            "--terracotta": "#FBBF24",
            "--sand": "#EDE9FE",
            "--cream": "#FAF5FF",
            "--dark-olive": "#4C1D95",
            "--brown-mid": "#4C1D95",
            "--amber": "#FBBF24",
            "--amber-light": "#FEF3C7",
            "--text-muted": "#6B7280",
            "--text-faint": "#9CA3AF",
            "--accent-rgb": "251, 191, 36"
        }
    },
    emerald: {
        name: "Emerald & Sand",
        swatches: ["#064E3B", "#D4A373"],
        pattern: "images/316096467619105663.jpg",
        vars: {
            "--charcoal": "#064E3B",
            "--gold": "#D4A373",
            "--terracotta": "#D4A373",
            "--sand": "#EFE9E1",
            "--cream": "#FAF7F2",
            "--dark-olive": "#065F46",
            "--brown-mid": "#065F46",
            "--amber": "#D4A373",
            "--amber-light": "#FDF6EC",
            "--text-muted": "#78716C",
            "--text-faint": "#9CA3AF",
            "--accent-rgb": "212, 163, 115"
        }
    },
    rose: {
        name: "Midnight & Rose Gold",
        swatches: ["#111111", "#B76E79"],
        pattern: null,
        vars: {
            "--charcoal": "#111111",
            "--gold": "#B76E79",
            "--terracotta": "#B76E79",
            "--sand": "#F1E8E8",
            "--cream": "#FBF7F7",
            "--dark-olive": "#1F1F1F",
            "--brown-mid": "#1F1F1F",
            "--amber": "#B76E79",
            "--amber-light": "#F8E8EB",
            "--text-muted": "#6B7280",
            "--text-faint": "#9CA3AF",
            "--accent-rgb": "183, 110, 121"
        }
    },
    sunset: {
        name: "Safari Sunset",
        swatches: ["#7C2D12", "#FB923C"],
        pattern: "images/46302702417260306.jpg",
        vars: {
            "--charcoal": "#431407",
            "--gold": "#FB923C",
            "--terracotta": "#FB923C",
            "--sand": "#FDEAD8",
            "--cream": "#FFF8F1",
            "--dark-olive": "#7C2D12",
            "--brown-mid": "#7C2D12",
            "--amber": "#FB923C",
            "--amber-light": "#FFEDD5",
            "--text-muted": "#8A6A56",
            "--text-faint": "#A8A29E",
            "--accent-rgb": "251, 146, 60"
        }
    }
};

function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    const root = document.documentElement;
    for (const [prop, value] of Object.entries(theme.vars)) {
        root.style.setProperty(prop, value);
    }

    root.style.setProperty("--pattern-img", theme.pattern ? `url("${theme.pattern}")` : "none");

    localStorage.setItem("le-continent-theme", themeName);

    document.querySelectorAll(".theme-card").forEach(card => {
        card.classList.toggle("active", card.dataset.theme === themeName);
    });
}

function initThemePanel() {
    const openBtn = document.querySelector('.navbar a[href="#theme"]');
    const panel = document.getElementById("themePanel");
    const overlay = document.getElementById("themeOverlay");
    const closeBtn = document.getElementById("themeClose");

    const openPanel = () => {
        panel.classList.add("open");
        overlay.classList.add("active");
        document.body.classList.add("no-scroll");
    };

    const closePanel = () => {
        panel.classList.remove("open");
        overlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
    };

    openBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openPanel();
    });

    closeBtn.addEventListener("click", closePanel);
    overlay.addEventListener("click", closePanel);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closePanel();
    });

    document.querySelectorAll(".theme-card").forEach(card => {
        card.addEventListener("click", () => applyTheme(card.dataset.theme));
    });
}

initThemePanel();
applyTheme(localStorage.getItem("le-continent-theme") || "amber");

/* ─── SIGN IN MODAL ─── */
function initAuth() {
    const openBtn = document.querySelector('.navbar a[href="#Signin"]');
    const modal = document.getElementById("authModal");
    const overlay = document.getElementById("authOverlay");
    const closeBtn = document.getElementById("authClose");
    const form = document.getElementById("authForm");
    const submitBtn = document.getElementById("authSubmit");
    const signInView = document.getElementById("authSignIn");
    const signedInView = document.getElementById("authSignedIn");

    let currentUser = localStorage.getItem("le-continent-user") || null;

    const openModal = () => {
        if (currentUser) {
            document.getElementById("authUserName").textContent =
                `${currentUser.split("@")[0]} (${currentUser})`;
            signInView.hidden = true;
            signedInView.hidden = false;
        } else {
            signInView.hidden = false;
            signedInView.hidden = true;
        }
        modal.classList.add("open");
        overlay.classList.add("active");
        document.body.classList.add("no-scroll");
    };

    const closeModal = () => {
        modal.classList.remove("open");
        overlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
    };

    const markSignedIn = (email) => {
        currentUser = email;
        openBtn.innerHTML = `<i class="fas fa-user-check"></i> ${email.split("@")[0]}`;
        openBtn.classList.add("signed-in");
    };

    const signOut = () => {
        currentUser = null;
        localStorage.removeItem("le-continent-user");
        openBtn.innerHTML = `<i class="fas fa-user"></i> Sign in`;
        openBtn.classList.remove("signed-in");
        signInView.hidden = false;
        signedInView.hidden = true;
        closeModal();
    };

    openBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
    });

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
    document.getElementById("authSignOut").addEventListener("click", signOut);
    document.getElementById("authClose2").addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("authEmail").value.trim();
        const password = document.getElementById("authPassword").value;
        const emailErr = document.getElementById("emailError");
        const passErr = document.getElementById("passError");

        let valid = true;

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailErr.textContent = "Please enter a valid email address";
            valid = false;
        } else {
            emailErr.textContent = "";
        }

        if (password.length < 4) {
            passErr.textContent = "Password must be at least 4 characters";
            valid = false;
        } else {
            passErr.textContent = "";
        }

        if (!valid) return;

        submitBtn.disabled = true;
        submitBtn.textContent = "Signing in...";

        setTimeout(() => {
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = "Sign In";
            closeModal();
            markSignedIn(email);
            localStorage.setItem("le-continent-user", email);
        }, 900);
    });

    if (currentUser) {
        markSignedIn(currentUser);
    }
}

initAuth();
