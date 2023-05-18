module.exports = ({ db }) => {

    return {
        add({title, description, path, user_id}){
            db.prepare("INSERT INTO pictures(title, description, path, owner_id) VALUES(?,?,?,?)").run(title, description, path, user_id);
        },
        getById(id) {
            return db.prepare("SELECT * FROM pictures WHERE id=?").get(id);
        },
        delete(id) {
            db.prepare("DELETE FROM scores WHERE picture_id=?").run(id);
            db.prepare("DELETE FROM pictures WHERE id=?").run(id);
        },
        updateTitle(id,title) {
            db.prepare("UPDATE pictures SET title=? WHERE id=?").run(title,id);
        },
        updateDescription(id,description) {
            db.prepare("UPDATE pictures SET description=? WHERE id=?").run(description,id);
        },
    }

} 