mispaf.addPageListener("enter:monProfil", (event) => {
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
    <a href="#" onclick="rateImage(${response.files[i].id},'${mispaf.escape(response.files[i].title)}','${mispaf.escape(response.files[i].description)}','${mispaf.escape(response.files[i].path)}',${mispaf.escape(response.files[i].owner_id)},${mispaf.escape(response.files[i].myid)})"> 
    <img src="${mispaf.escape(response.files[i].path)}" 
    alt="${mispaf.escape(response.files[i].title)})"></a>          
    <h3>${mispaf.escape(response.files[i].title)}</h3>
    <a href="#" onclick="showOtherUser('${mispaf.escape(response.files[i].username)}')"> 
    ${mispaf.escape(response.files[i].username)}</a>
    <h4>Score de ${mispaf.escape(response.files[i].score)}/5</h4>
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
<tr id="monImage">
<div class="image">
<td><img src="${mispaf.escape(response.files[i].path)}" alt="${mispaf.escape(response.files[i].title)}">
    <h3 id="titre">${mispaf.escape(response.files[i].title)}</h3>
    <span id="description">${mispaf.escape(response.files[i].description)}</span>
    <h4>Score de ${mispaf.escape(response.files[i].score)}/5</h4></td>
    <br>
    <div class="button-container">
        <button class="roundedButton" onclick="deleteImage(${response.files[i].id},'${mispaf.escape(response.files[i].path)}')">Effacer image</button>
        <button class="roundedButton" onclick="modifImage(${response.files[i].id},'${mispaf.escape(response.files[i].title)}','${mispaf.escape(response.files[i].description)}','${mispaf.escape(response.files[i].path)}')">Modifier l'image</button>
    </div>
</div>
</tr>
`   );
            }
            container2.innerHTML = images.join('');
        },
        error(response) {
            alert(response);
        }
    });
}
)

document.getElementById("switchProfil").addEventListener('click',(event)=>{
    event.preventDefault();
    if (document.getElementById('mesAbos').classList.contains("invisible")) {
        document.getElementById('mesAbos').classList.remove("invisible");
        document.getElementById('mesCreas').classList.add("invisible");
        document.getElementById('pagePerso').innerText="Mes Abonnements";
        document.getElementById('switchProfil').value="mes créations";
    } else {
        document.getElementById('mesAbos').classList.add("invisible");
        document.getElementById('mesCreas').classList.remove("invisible");
        document.getElementById('pagePerso').innerText="Mes Créations";
        document.getElementById('switchProfil').value="mes abonnements";
    }
});


function deleteImage(id, path) {
    function confirmDelete() {
      const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette image ?");
      if (confirmation) {
        // Suppression de l'enregistrement dans la base de données
        mispaf.ajax({
          url: "/monProfil/delete",
          type: 'POST',
          data: { id: id, path: path },
          success() {
            alert('Image supprimée');
            mispaf.page(mispaf.page()); // Actualiser la page
          },
          error(message) {
            alert(message);
          }
        });
      } else {
        // Annulation de la suppression
        mispaf.page(mispaf.page());
      }
    }
  
    confirmDelete();
  } 
  

let imageId = null
let imageTitle = null
let imageDescription = null
let imagePath = null

function modifImage(id,title,description,path) {
    event.preventDefault();
    imageId = id;
    imageTitle = title;
    imageDescription = description;
    imagePath = path;
    mispaf.page('modifImage');  
}   

function rateImage(id, title, description, path, owner_id, myid, previousPage) {
    event.preventDefault();
    imageId = id;
    imageTitle = title;
    imageDescription = description;
    imagePath = path;
    sessionStorage.setItem('previousPage', previousPage);
    if (myid !== owner_id) {
        mispaf.page('voteImage')
    }
}

   
