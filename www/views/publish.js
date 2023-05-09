(()=>{

    let form=document.querySelector("#publish form");

    mispaf.addPageListener("enter:publish",(event)=>{
        mispaf.reset(form);
    });
// il faudrait valider ici que les données soient correcte
    form.querySelector('input[type=submit]').addEventListener('click',(event)=>{
        event.preventDefault(); //definir les variable
        /*if (!title || !description || !fileInput.files.length) {
            alert("Tous les champs sont obligatoires.");
            console.log("Tous les champs sont obligatoires.")// ne fonctionne pas definir les variables
            return;
        } */
        mispaf.ajax({
            url:"/items/add", // important, c'est le chemin que l'on recuper dans le controler items.js
            type:'POST',
            data: form, // ne pas changer la methode form qui est une fonction de mispaf qui s'occupe d'envoyer les fichier

            success() {
                alert("Objet publié.");
                mispaf.page(mispaf.page()); // refresh
            },
            error(message) {
                alert(message);
            }
        })
    });

})();

