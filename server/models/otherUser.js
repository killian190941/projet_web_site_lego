module.exports = ({ db }) => {
    return {
        otherUserImages(otherUsername) {
            let result = db.prepare(`
              SELECT users.login, pictures.title, pictures.description, pictures.path 
              FROM pictures 
              JOIN users ON pictures.owner_id=users.id 
              WHERE users.login = ? 
              ORDER BY pictures.id DESC
            `).all(otherUsername);
            return result;
        }
    }
}
