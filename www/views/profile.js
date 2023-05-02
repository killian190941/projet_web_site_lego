(()=>{

    let form=document.querySelector("#profile form");

    mispaf.addPageListener("enter:profile",(event)=>{
        mispaf.reset(form);
    });

    form.querySelector('input[type=submit').addEventListener('click',(event)=>{
        event.preventDefault();
        mispaf.ajax({
            url:"/users/changePassword",
            type:'POST',
            data:form,
            success() {
                alert("Mot de passe changé.");
                mispaf.page(mispaf.page()); // refresh
            },
            error(message) {
                alert(message);
            }
        })
    });

})();

