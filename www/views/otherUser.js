mispaf.addPageListener("enter:otherUser", (event) => {
    let container = document.querySelector('#otherUser .image-container');
    container.innerHTML = '';
    mispaf.ajax({
        url: "/otherUser/otherUserProfile",
        type: 'POST',
        data:{username:otherUserName},
        success(response) {
            document.getElementById('nameUser').innerText="Page de "+otherUserName
            let images = [];
            for (let i = 0; i < response.files.length; i++) {
                images.push(`
<div class="image">
    <img src="${mispaf.escape(response.files[i].path)}" alt="${mispaf.escape(response.files[i].title)}">
    <h3>${mispaf.escape(response.files[i].title)}</h3>
    <span>${mispaf.escape(response.files[i].description)}</span>
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

function showOtherUser(username){
    event.preventDefault();
    otherUserName=username;
    mispaf.page('otherUser');
}