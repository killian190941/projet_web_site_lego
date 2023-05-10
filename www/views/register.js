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
        event.preventDefault();
        mispaf.ajax({
            url:"auth/register",
            type:'POST',
            data:document.querySelector('#register form'),
            success() {
                alert("Bravo, vous êtes enregistré mais vous devez encore vous connecter.");
                mispaf.page('login');
                mispaf.reset(document.querySelector('#login form'));
            },
            error(message) {
                alert(message);
            }
        })
    });


})();
