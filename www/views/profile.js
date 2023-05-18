(()=>{

    let form1=document.querySelector("#newMDP form");
    let form2=document.querySelector("#newMail form");

    mispaf.addPageListener("enter:profile",(event)=>{
        mispaf.reset(form1);
        mispaf.reset(form2);
    });

    form1.querySelector('input[type=submit]').addEventListener('click',(event)=>{
        if (mispaf.validateNotEmpty(form1,["password1","password2","password3"],"Ce champ est obligatoire")) {
            event.preventDefault();
        }
        if (mispaf.serializeObject(form1).password2.length < 8) {
            event.preventDefault();
            mispaf.setFieldError(form1,"password2","Le nouveau mdp doit avoir une longueur minimale de 8 caractères");
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(mispaf.serializeObject(form1).password2)) {
            event.preventDefault();
            mispaf.setFieldError(form1,"password2","Le nouveau mdp doit contenir au moins une lettre minuscule, une lettre majuscule et un chiffre");
        } else {
            mispaf.setFieldError(form1,"password2",null);
        }
        if (mispaf.serializeObject(form1).password2!=mispaf.serializeObject(form1).password3) {
            event.preventDefault();
            mispaf.setFieldError(form1,"password3","Les mots de passe sont différents");
        } 
        event.preventDefault();
        mispaf.ajax({
            url:"/users/changePassword",
            type:'POST',
            data:form1,
            success() {
                alert("Mot de passe changé.");
                mispaf.page('monProfil'); 
            },
            error(message) {
                alert(message);
            }
        })
    });

   form2.querySelector('input[type=submit]').addEventListener('click',(event)=>{
        if (mispaf.validateNotEmpty(form2,["email1","email2"],"Ce champ est obligatoire")) {
            event.preventDefault();
        }
        if (!/\S+@\S+\.\S+/.test(mispaf.serializeObject(form2).email2)) {
            event.preventDefault();
            mispaf.setFieldError(form2,"email2","Le nouvel email doit contenir un @ et un .")
        } else {
            mispaf.setFieldError(form2,"email2",null);
        }
            event.preventDefault();
            mispaf.ajax({
                url:"/users/changeMail",
                type:'POST',
                data: form2,
                success() {
                    alert("Mail changé.");
                    mispaf.page('monProfil'); 
                },
                error(message) {
                    alert(message);
                }
            })
    }); 
})();



