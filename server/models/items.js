module.exports = ({ db }) => {

    return {
        add({title, description, path, user_id}){
            db.prepare("INSERT INTO pictures(title, description, path, owner_id) VALUES(?,?,?,?)").run(title, description, path, user_id);
        },
        delete(id) {
            return db.prepare("DELETE FROM pictures WHERE id=?").run(id);
        },
        updateTitle(id,title) {
            db.prepare("UPDATE pictures SET title=? WHERE id=?").run(id,title);
        },
        updateDescription(id,description) {
            db.prepare("UPDATE pictures SET description=? WHERE id=?").run(id,description);
        },
    }

} 