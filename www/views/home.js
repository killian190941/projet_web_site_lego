mispaf.addPageListener('enter:home', () => {
    mispaf.ajax({
        url: "auth/whoami",
        type: 'POST',
        success(response) {
            if (response != null) {
                mispaf.user = response.login;
                document.body.classList.remove("nologin");
                document.getElementById('info').innerText="Bienvenue "+mispaf.user+" !"
            } else {
                mispaf.user = null;
                document.body.classList.add("nologin");
                document.getElementById('info').innerText="Veuillez vous inscrire ou vous authentifier pour continuer"
            }
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