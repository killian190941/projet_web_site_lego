mispaf.addPageListener("enter:home", (event) => {
    let container = document.querySelector('#home .image-container');
    container.innerHTML = '';
    mispaf.ajax({
        url: "/latestImages/latestImagesNotConnected",
        type: 'POST',
        success(response) {
            let images = [];
            for (let i = 0; i < response.files.length; i++) {
                images.push(`
<div class="image">
    <img src="${mispaf.escape(response.files[i].path)}" alt="${mispaf.escape(response.files[i].title)}">
    <h3>${mispaf.escape(response.files[i].title)}</h3>
    <a href="#" onclick="showOtherUser('${mispaf.escape(response.files[i].username)}')"> 
    ${mispaf.escape(response.files[i].username)}</a>
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
})

mispaf.addPageListener("enter:lastImages", (event) => {   
    let container = document.querySelector('#lastImages .image-container');
    container.innerHTML = '';
    mispaf.ajax({
        url: "/latestImages/latestImagesConnected",
        type: 'POST',
        success(response) {
            let images = [];
            for (let i = 0; i < response.files.length; i++) {
                images.push(`
<div class="image">
    <a href="#" onclick="rateImage(${response.files[i].id},'${mispaf.escape(response.files[i].title)}','${mispaf.escape(response.files[i].description)}','${mispaf.escape(response.files[i].path)}',${mispaf.escape(response.files[i].owner_id)},${mispaf.escape(response.files[i].myid)})"> 
    <img src="${mispaf.escape(response.files[i].path)}" 
    alt="${mispaf.escape(response.files[i].title)})"></a>  
    <h3>${mispaf.escape(response.files[i].title)}</h3>
    <a href="#" onclick="showOtherUser('${mispaf.escape(response.files[i].username)}')"> 
    ${mispaf.escape(response.files[i].username)}</a>
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
}) 

let otherUserName=null;

function showOtherUser(username) {
    event.preventDefault();
    otherUserName=username;
    mispaf.page('otherUser');
}
