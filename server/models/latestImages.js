module.exports = ({ db }) => {
    return {
        getLatestImages() {
            let result = db.prepare(`SELECT users.login, pictures.title, pictures.path 
                                     FROM pictures 
                                     JOIN users ON pictures.owner_id=users.id 
                                     ORDER BY pictures.id DESC LIMIT 10`).all();
            return result;
        }
    }
}
