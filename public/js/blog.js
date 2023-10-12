const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    }
};

const updateButtonHandler = async (event) => {

    const name = document.querySelector('#newName').value.trim();
    const content = document.querySelector('#newContent').value.trim();


    if (event.target.hasAttribute('data-id')) {

        if (name && content) {

            const id = event.target.getAttribute('data-id');

            const response = await fetch(`/api/blogs/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ name, content }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                document.location.replace(`/blog/${id}`);
            } else {
                alert('Failed to update post');
            }

        }
    }
};

const commentButtonHandler = async (event) => {


    const content = document.querySelector('#newComment').value.trim();
   

    
    if (event.target.hasAttribute('data-id')) {

        if (content) {

            const id = event.target.getAttribute('data-id');

            const response = await fetch(`/api/blogs/${id}`, {
                method: 'POST',
                body: JSON.stringify({ content }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                document.location.replace(`/blog/${id}`);
            } else {
                alert('Failed to add comment');
            }

        }
    }
};

document
    .querySelector('.blog-list')
    .addEventListener('click', delButtonHandler);
document
    .querySelector('.update')
    .addEventListener('click', updateButtonHandler);
document
    .querySelector('.comment')
    .addEventListener('click', commentButtonHandler);


