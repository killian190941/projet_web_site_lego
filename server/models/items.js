module.exports = ({ db }) => {

    return {
        publish({title, description, user_id}){
            db.prepare("INSERT INTO pictures(title,description) value(?,?)").run(title,description,useur_id);
        }
    }

} // il faut pouvoir envoyer le ficher aussi. on a un exemple dans files. js