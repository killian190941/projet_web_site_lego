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
    <h3 id="titre">${mispaf.escape(response.files[i].title)}</h3>
    <span id="description">${mispaf.escape(response.files[i].description)}</span>
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

document.getElementById("subscribeBtn").addEventListener('click',(event)=>{
    event.preventDefault();
    event.stopPropagation();
    mispaf.ajax({
        url:"subscribe/subscribe",
        type:'POST',
        data:{username:otherUserName},
        success() {
            alert("Vous vous êtes bien abonné à ce profil.");
            mispaf.page(mispaf.page()); // refresh
        },
        error(message) {
            alert(message);
        }
    })
});

document.getElementById("unSubscribeBtn").addEventListener('click',(event)=>{
    event.preventDefault();
    event.stopPropagation();
    mispaf.ajax({
        url:"subscribe/unsubscribe",
        type:'POST',
        data:{username:otherUserName},
        success() {
            alert("Vous vous êtes bien désabonné de ce profil.");
            mispaf.page(mispaf.page()); // refresh
        },
        error(message) {
            alert(message);
        }
    })
});