window.addEventListener('DOMContentLoaded', (event) => {
    mispaf.ajax({
        url: "auth/whoami",
        type: 'POST',
        success(response) {
            if (response != null) {
                mispaf.page('monProfil');
            } else {
                mispaf.page('home');
            }
        },
        error(response) {
            console.error(response);
        }
    });
});

mispaf.addPageListener('enter:home', () => {
    mispaf.ajax({
        url: "auth/whoami",
        type: 'POST',
        success(response) {
            if (response != null) {
                user = response.login;
                document.body.classList.remove("nologin");
                document.getElementById('info').innerText="Bienvenue "+user+" !"
            } else {
                user = null;
                document.body.classList.add("nologin");
                document.getElementById('info').innerText="Veuillez vous inscrire ou vous authentifier pour continuer"
                document.getElementById('description_concept').innerText="Instagram AFOL est LE site numéro 1 des adultes fan de LEGO. \n Il permet aux fans de LEGO à travers le monde de partager leur créations avec d'autres adeptes. \n Ci-dessous, retrouvez les 10 dernières créations postées par nos membres"    
            }

            document.querySelector('.logolink').addEventListener('click', (event) => {
                event.preventDefault();
                if(user) {
                    mispaf.page('monProfil'); 
                } else {
                    mispaf.page('home'); 
                }
            });
        },
        error(response) {
            alert(response);
        }
    });
});

document.getElementById("logoutBtn").addEventListener('click',(event)=>{
    event.preventDefault();
    event.stopPropagation();
    mispaf.ajax({
        url:"auth/logout",
        type:'POST',
        success() {
            mispaf.page('home');
        },
        error(message) {
            alert(message);
        }
    })
});