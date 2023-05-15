(()=>{
    let old;

    mispaf.addPageListener('enter:register',(event)=>{
        old=event.leave||"home";
        mispaf.reset(document.querySelector('#register form'));
    });
    
    document.querySelector('#register input[value="Annuler"]').addEventListener('click',(event)=>{
        event.preventDefault();
        mispaf.page(old);
    });

    document.querySelector('#register input[value="Ok"]').addEventListener('click',(event)=>{
        const form=document.querySelector("#register form");
        if (mispaf.validateNotEmpty(form,["login","name","password1","password2","email1"],"Ce champ est obligatoire")) {
            event.preventDefault();
        }
        if (mispaf.serializeObject(form).login.length < 8) {
            event.preventDefault();
            mispaf.setFieldError(form,"login","L'identifiant doit avoir une longueur minimale de 8 caractères");
        } else if (!/^[a-zA-Z0-9]+$/.test(mispaf.serializeObject(form).login)) {
            event.preventDefault();
            mispaf.setFieldError(form,"login","L'identifiant ne peut contenir que des chiffres et des lettres");
        } else {
            mispaf.setFieldError(form,"login",null);
        }
        if (mispaf.serializeObject(form).password1.length < 8) {
            event.preventDefault();
            mispaf.setFieldError(form,"password1","Le mdp doit avoir une longueur minimale de 8 caractères");
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(mispaf.serializeObject(form).password1)) {
            event.preventDefault();
            mispaf.setFieldError(form,"password1","Le mdp doit contenir au moins une lettre minuscule, une lettre majuscule et un chiffre");
        } else {
            mispaf.setFieldError(form,"password1",null);
        }
        if (mispaf.serializeObject(form).password1!=mispaf.serializeObject(form).password2) {
            event.preventDefault();
            mispaf.setFieldError(form,"password2","Les mots de passe sont différents");
        } else {
            mispaf.setFieldError(form,"password2",null);
        }
        if (!/\S+@\S+\.\S+/.test(mispaf.serializeObject(form).email1)) {
            event.preventDefault();
            mispaf.setFieldError(form,"email1","L'email doit contenir un @ et un .");
        }
        event.preventDefault();
        mispaf.ajax({
            url:"auth/register",
            type:'POST',
            data:document.querySelector('#register form'),
            success() {
                alert("Bravo, vous êtes enregistré mais vous devez encore vous connecter.");
                mispaf.page('home');
            },
            error(message) {
                alert(message);
            }
        })
    });
})();


        


