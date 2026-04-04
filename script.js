// Store data in arrays
let posts = [];
let homeworks = [];

// Show/hide sections
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    document.getElementById(sectionId).style.display = 'block';
}

// Add a new post
function addPost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    
    if (!title.trim()) {
        alert('Please enter a title for your post!');
        return;
    }
    
    const post = {
        id: Date.now(),
        title: title,
        content: content,
        timestamp: new Date().toLocaleString(),
        likes: 0
    };
    
    posts.unshift(post); // Add to beginning
    
    // Clear form
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
    
    displayPosts();
}

// Display all posts
function displayPosts() {
    const postsList = document.getElementById('postsList');
    
    if (posts.length === 0) {
        postsList.innerHTML = '<p class="empty">No posts yet. Be the first!</p>';
        return;
    }
    
    postsList.innerHTML = posts.map(post => `
        <div class="item">
            <h3>${escapeHtml(post.title)}</h3>
            ${post.content ? `<p>${escapeHtml(post.content)}</p>` : ''}
            <div class="item-meta">
                ⏰ ${post.timestamp} | 👍 ${post.likes}
            </div>
        </div>
    `).join('');
}

// Add homework
function addHomework() {
    const subject = document.getElementById('hwSubject').value;
    const title = document.getElementById('hwTitle').value;
    const description = document.getElementById('hwDescription').value;
    
    if (!subject.trim() || !title.trim()) {
        alert('Please enter subject and homework title!');
        return;
    }
    
    const homework = {
        id: Date.now(),
        subject: subject,
        title: title,
        description: description,
        timestamp: new Date().toLocaleString(),
        comments: 0
    };
    
    homeworks.unshift(homework);
    
    // Clear form
    document.getElementById('hwSubject').value = '';
    document.getElementById('hwTitle').value = '';
    document.getElementById('hwDescription').value = '';
    
    displayHomework();
}

// Display all homework
function displayHomework() {
    const homeworkList = document.getElementById('homeworkList');
    
    if (homeworks.length === 0) {
        homeworkList.innerHTML = '<p class="empty">No homework shared yet.</p>';
        return;
    }
    
    homeworkList.innerHTML = homeworks.map(hw => `
        <div class="item">
            <h3>[${escapeHtml(hw.subject)}] ${escapeHtml(hw.title)}</h3>
            ${hw.description ? `<p>${escapeHtml(hw.description)}</p>` : ''}
            <div class="item-meta">
                📝 Shared ${hw.timestamp} | 💬 ${hw.comments}
            </div>
        </div>
    `).join('');
}

// Prevent XSS attacks
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>'"/g, m => map[m]);
}

// Initialize on page load
window.addEventListener('load', () => {
    // Show posts section by default
    showSection('posts');
    displayPosts();
    displayHomework();
    
    // Add sample data
    posts.push({
        id: 1,
        title: 'Library study session on Friday?',
        content: 'Hey! Anyone interested in a study group at the library on Friday at 3 PM? We could work on homework together.',
        timestamp: new Date().toLocaleString(),
        likes: 3
    });
    
    homeworks.push({
        id: 1,
        subject: 'Math',
        title: 'Chapter 5 exercises',
        description: 'Do all exercises from page 120-125. Due next Monday.',
        timestamp: new Date().toLocaleString(),
        comments: 2
    });
    
    displayPosts();
    displayHomework();
}