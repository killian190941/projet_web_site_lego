mispaf.addPageListener("enter:monProfil", () => {
    mispaf.ajax({
        url: "auth/whoami",
        type: 'POST',
        success(response) {
            user = response.login;
            document.body.classList.remove("nologin");
            document.getElementById('myInfo').innerText="Bienvenue "+user+" !"
        }
    });
    let container = document.querySelector('#mesAbos .image-container');
    container.innerHTML = '';
    mispaf.ajax({
        url: "/monProfil/listAbos",
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
</div>
`   );
            }
            container.innerHTML = images.join('');
        },
        error(response) {
            alert(response);
        }
    });
    let container2 = document.querySelector('#mesCreas .image-container');
    container2.innerHTML = '';
    mispaf.ajax({
        url: "/monProfil/listCreations",
        type: 'POST',
        success(response) {
            let images = [];
            for (let i = 0; i < response.files.length; i++) {
                images.push(`
<div class="image">
    <img src="${mispaf.escape(response.files[i].path)}" alt="${mispaf.escape(response.files[i].title)}">
    <h3 id="titre">${mispaf.escape(response.files[i].title)}</h3>
    <span id="description">${mispaf.escape(response.files[i].description)}</span>
    <div id="imageBtn" class="button-container">
        <button onclick="deleteImage(${response.files[i].id})" class="roundedButton">Effacer image</button>
        <button onclick="modifImage(${response.files[i].id})" class="roundedButton">Modifier l'image</button>
    </div>
</div>
`);
            }
            container2.innerHTML = images.join('');
        },
        error(response) {
            alert(response);
        }
    });
}
)

function deleteImage(id) {
    mispaf.ajax({
        url:"/monProfil/delete",
        type:'POST',
        data:{id:id},
        success() {
            mispaf.page(mispaf.page()); // refresh page
        },
        error(message) {
            alert(message);
        }
    })
} 

/* function modifImage(id) {
    mispaf.ajax({
        url:"/monProfil/modification",
        type:'POST',
        data:{id:id},
        success() {
            mispaf.page(mispaf.page()); // refresh page
        },
        error(message) {
            alert(message);
        }
    })
} 

let idImage=null;

function modifImage(id) {
    event.preventDefault();
    idImage=id
    mispaf.page('modifImage');
} */
