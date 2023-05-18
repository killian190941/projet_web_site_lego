mispaf.addPageListener("enter:otherUser", (event) => {
    mispaf.ajax({
        url: "auth/whoami",
        type: 'POST',
        success(response) {
            if (response != null) {
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
    <a href="#" onclick="rateImage(${response.files[i].id},'${mispaf.escape(response.files[i].title)}','${mispaf.escape(response.files[i].description)}','${mispaf.escape(response.files[i].path)}',${mispaf.escape(response.files[i].owner_id)},${mispaf.escape(response.files[i].myid)})"> 
    <img src="${mispaf.escape(response.files[i].path)}" 
    alt="${mispaf.escape(response.files[i].title)})"></a>  
    <h3>${mispaf.escape(response.files[i].title)}</h3>
    <span>${mispaf.escape(response.files[i].description)}</span>
    <h4>Score de ${mispaf.escape(response.files[i].score)}/5</h4>
</div>
                    `);
                        }
                        container.innerHTML = images.join('');
                    },
                    error(response) {
                        alert(response);
                    }
                });
            } else {
                let container = document.querySelector('#otherUser .image-container');
                container.innerHTML = '';
                mispaf.ajax({
                    url: "/otherUser/otherUserProfileNotConnected",
                    type: 'POST',
                    data:{username:otherUserName},
                    success(response) {
                        document.getElementById('nameUser').innerText="Page de "+otherUserName
                        let images = [];
                        for (let i = 0; i < response.files.length; i++) {
                            images.push(`
<div class="image">
    <img src="${mispaf.escape(response.files[i].path)}" 
    alt="${mispaf.escape(response.files[i].title)})"> 
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
            }
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
            mispaf.page('monProfil'); // refresh
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
            mispaf.page('monProfil'); // refresh
        },
        error(message) {
            alert(message);
        }
    })
});