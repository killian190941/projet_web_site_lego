mispaf.addPageListener("enter:modifImage", (event) => {
    let container = document.querySelector('#modifImage .image-container');
    let image = [];
    image.push(`
        <div class="image">
            <img src="${mispaf.escape(imagePath)}" alt="${mispaf.escape(imageTitle)}">   
        </div>
    `);
    container.innerHTML = image.join('');
    document.querySelector('#monImage #newTitle').value = imageTitle
    document.querySelector('#monImage #newDescription').value = imageDescription
})

document.getElementById("validerModif").addEventListener('click',(event)=>{
    newImageTitle = document.querySelector('#monImage #newTitle').value;
    newImageDescription = document.querySelector('#monImage #newDescription').value;
    if (newImageTitle.trim() == "") {
        newImageTitle= imageTitle;
    }
    if (newImageDescription.trim() == "") {
        newImageDescription = imageDescription;
    }
    event.preventDefault();
    mispaf.ajax({
        url:"monProfil/modification",
        type:'POST',
        data:{id:imageId,title:newImageTitle,description:newImageDescription},
        success() {
            alert("Vous avez bien modifié le titre / la description de l'image");
            mispaf.page('monProfil'); 
        },
        error(message) {
            alert(message);
        }
    })
});

document.getElementById("annulerModif").addEventListener('click',(event)=>{
    event.preventDefault();
    mispaf.page('monProfil'); 
});

