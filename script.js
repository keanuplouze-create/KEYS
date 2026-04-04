// script.js

// Function to create a post
function createPost(title, content) {
    return {
        title: title,
        content: content,
        createdAt: new Date().toUTCString()
    };
}

// Function to display a post
function displayPost(post) {
    console.log('Title: ' + post.title);
    console.log('Content: ' + post.content);
    console.log('Created At: ' + post.createdAt);
}

// Function to create homework
function createHomework(subject, dueDate) {
    return {
        subject: subject,
        dueDate: dueDate,
        createdAt: new Date().toUTCString()
    };
}

// Function to display homework
function displayHomework(homework) {
    console.log('Subject: ' + homework.subject);
    console.log('Due Date: ' + homework.dueDate);
    console.log('Created At: ' + homework.createdAt);
}