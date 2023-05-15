(()=>{

    let form=document.querySelector("#publish form");
    let old=null;

    mispaf.addPageListener("enter:publish",(event)=>{
        if ("leavePage" in event) old=event.leavePage;
        mispaf.reset(form);
    });

    form.querySelector('input[value="Annuler"]').addEventListener('click',()=>{
        if (old!=null) mispaf.page(old);
    });
    
    form.querySelector('input[value="Ajouter image"]').addEventListener('click',async (event)=>{
        if (mispaf.validateNotEmpty(form,["title","description"],"Ce champ est obligatoire")) {
            event.preventDefault();
        }
        event.preventDefault(); 
        mispaf.ajax({
            url:"/items/add", // important, c'est le chemin que l'on recuper dans le controler items.js
            type:'POST',
            data: form, 
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

