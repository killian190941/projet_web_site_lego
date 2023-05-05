module.exports = ({ db }) => {

    return {
        add({title, description,path, user_id}){
            db.prepare("INSERT INTO pictures(title, description, path, owner_id) value(?,?,?,?)").run(title, description, path, user_id);
        }
    }

} // il faut pouvoir envoyer le ficher aussi. on a un exemple dans files. js