(()=>{

    let form=document.querySelector("#upload form");
    let old=null;

    mispaf.addPageListener("enter:upload",(event)=>{
        if ("leavePage" in event) old=event.leavePage;
        mispaf.reset(form);
    });

    form.querySelector('input[value="Annuler"]').addEventListener('click',()=>{
        if (old!=null) mispaf.page(old);
    });

    form.querySelector('input[value="Ok"]').addEventListener('click',async (event)=>{
        event.preventDefault();
        mispaf.ajax({
            url:"/file/upload",
            type:'POST',
            data:form,
            success() {
                alert("Fichier envoyé.");
                mispaf.reset(form);
            },
            error(message) {
                alert(message);
            }
        })
    });

})();

