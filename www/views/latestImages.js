mispaf.addPageListener("enter:home", (enter) => {
    let container = document.querySelector('#home .image-container');
    container.innerHTML = '';
    mispaf.ajax({
        url: "/latestImages/latestImages",
        type: 'POST',
        success(response) {
            let images = [];
            for (let i = 0; i < response.files.length; i++) {
                images.push(`
<div class="image">
    <img src="${mispaf.escape(response.files[i].path)}" alt="${mispaf.escape(response.files[i].title)}">
    <h3 id="titre">${mispaf.escape(response.files[i].title)}</h3>
    <a id="userLink" href="#" onclick="showOtherUser('${mispaf.escape(response.files[i].username)}')"> ${mispaf.escape(response.files[i].username)}</a>
</div>
`);
            }
            container.innerHTML = images.join('');
        },
        error(response) {
            alert(response);
        }
    });
})

let otherUserName=null;

function showOtherUser(username) {
    event.preventDefault();
    otherUserName=username;
    mispaf.page('otherUser');
}
