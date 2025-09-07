const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('posts');
const toggleThemeBtn = document.getElementById('toggleTheme');
const body = document.getElementById('app');

// Ambil data dari localStorage
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// Render post
function renderPosts() {
    postsContainer.innerHTML = "";
    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'bg-white shadow p-4 rounded border';
        postElement.innerHTML =
            `
            <h2 class='text-xl font-bold'>${post.title}</h2>
            <p class='text-gray-700 my-2'>${post.content}</p>
            <small class='text-gray-500'>${post.date}</small>
            <div class='mt-3'>
                <button onclick='deletePost(${index})' class='text-red-500 hover:underline'>Hapus</button>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Tambah post baru
postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();

    if (title && content) {
        const newPost = {
            title,
            content,
            date: new Date().toLocaleString(),
        };
        posts.unshift(newPost); // Tambah ke awal array
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
        postForm.reset();
    }
});

// Hapus post
function deletePost(index) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
}

toggleThemeBtn.addEventListener('click', () => {
    body.classList.toggle('bg-gray-100');
    body.classList.toggle('bg-gray-900');
    body.classList.toggle('text-gray-900');
    body.classList.toggle('text-dark');

    // Input & textarea
    document.querySelectorAll('input,texarea').forEach(el => {
        el.classList.toggle('bg-gray-100');
        el.classList.toggle('bg-gray-100');
        el.classList.toggle('text-gray-900');
        el.classList.toggle('text-gray-100');
    });

    // Semua post (judul, konten, tanggal)
    document.querySelectorAll('#posts h2, #posts p, #posts small').forEach(el => {
        el.classList.toggle('text-dark');
    });

    toggleThemeBtn.textContent = body.classList.contains('bg-gray-900') ? 'Toggle Light' : 'Toggle Dark';
}) 