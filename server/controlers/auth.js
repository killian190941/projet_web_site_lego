const bcrypt = require("bcrypt");

module.exports = {
    requireAuth: false,
    async login({ params, model, setUser, HTTPError }) {
        let user = model.users.getByLogin(params.login);
        if (user && await bcrypt.compare(params.password, user.password)) {
            setUser({ login: user.login });
        } else {
            throw new HTTPError("Invalid user/password", 403);
        }
    },
    async register({ params, model, HTTPError }) {
        if (params.login.length < 8) {
            throw new HTTPError("L'identifiant doit avoir une longueur minimale de 8 caractères.",422);
        } else if (params.password1.length < 8) {
            throw new HTTPError("Le  mot de passe doit avoire une longueur minimale de 8 caractères.",422);
        } else if ((!/^[a-zA-Z0-9]+$/.test(params.login))) {
            throw new HTTPError("L'identifiant ne peut contenir que des chiffres et des lettres.",422);
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(params.password1)) {
            throw new HTTPError("Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule et un chiffre.",422);
        }  else if (params.password1!=params.password2) {
            throw new HTTPError("Les mots de passe sont différents",422);
        } else if (model.users.getByLogin(params.login)) {
            throw new HTTPError("Cet identifiant est déjà utilisé par un autre utilisateur.", 422);
        // } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(params.email)) {
        //    throw new HTTPError("L'email doit contenir un '@' et un '.'.",422);
        }    
        let hash = await bcrypt.hash(params.password1, 10);
        model.users.register({login:params.login, password:hash, email:params.email1});
    },
    async whoami({ user }) {
        return user;
    },
    async logout({clearUser}) {
        clearUser();
    }
}
