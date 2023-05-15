const bcrypt = require("bcrypt");

module.exports = {
    listUsers({ model }) {
        return model.users.list();
    },
    delete({ model, params, user, HTTPError }) {
        let myid = model.users.getByLogin(user.login).id;
        if (params.id == myid) {
            throw new HTTPError("Vous ne pouvez pas vous effacer vous-même.");
        }
        return model.users.delete(params.id, 422);
    },
    async changePassword({ model, params, user, HTTPError }) {
        // fetch password
        user = model.users.getByLogin(user.login);
        if (!await bcrypt.compare(params.password1, user.password)) {
            throw new HTTPError("Ancien mot de passe invalide",422);
        } else if (params.password2.trim()=="") {
            throw new HTTPError("Nouveau mot de passe manquant.",422);
        } else if (params.password2!=params.password3) {
            throw new HTTPError("Les mot de passe sont différents.",422);
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(params.password2)) {
            throw new HTTPError("Le nouveau mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule et un chiffre.",422);
        } else if (params.password2.length < 8) {
            throw new HTTPError("Le nouveau mot de passe doit contenir minimum 8 caractères.",422);
        }
        let hash = await bcrypt.hash(params.password2, 10);
        model.users.updatePassword(user.id,hash);
    },
    async changeMail({ model, params, user, HTTPError }) {
        user = model.users.getByLogin(user.login);
        if (params.email1 != user.email) {
            throw new HTTPError("L'email actuel que vous avez entré n'existe pas",422);
        } else if (!/\S+@\S+\.\S+/.test(params.email2)) {
            throw new HTTPError("Le nouvel email doit contenir un @ et un .",422);
        } else if (params.email1 == params.email2) {
            throw new HTTPError("Vous avez entré la même adresse mail",422)
        }
        let newMail = params.email2;
        model.users.updateEmail(user.id,newMail);
    }
}