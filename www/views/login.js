(() => {
    // lambda expression immediately executed

    let old; // because of the lambda, this is a local variable, protected from other JavaScript loaded in the page

    mispaf.addPageListener('enter:login', (event) => {
        old = event.leave || "home"; // in this context, || means that if left hand side is null, undefined or false, then use the right hand side
        mispaf.reset(document.querySelector('#login form'));
    });

    document.querySelector('#login input[value="Annuler"]').addEventListener('click', (event) => {
        event.preventDefault();
        mispaf.page(old);
    });

    document.querySelector('#login input[value="Ok"]').addEventListener('click', (event) => {
        event.preventDefault();
        mispaf.ajax({
            url: "auth/login",
            type: 'POST',
            data: document.querySelector('#login form'),
            success() {
                mispaf.page('home');
            },
            error(message) {
                alert(message);
            }
        })
    });

})();
