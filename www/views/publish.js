(()=>{

    let form=document.querySelector("#publish form");

    mispaf.addPageListener("enter:publish",(event)=>{
        mispaf.reset(form);
    });
// il faudrait valider ici que les données soient correcte
    form.querySelector('input[type=submit]').addEventListener('click',(event)=>{
        event.preventDefault();
        mispaf.ajax({
            url:"/items/publish", // important, c'est le chemin que l'on recuper dans le controler items.js
            type:'POST',
            data:form,
            success() {
                alert("publié");
                mispaf.page(mispaf.page()); // refresh
            },
            error(message) {
                alert(message);
            }
        })
    });

})();

