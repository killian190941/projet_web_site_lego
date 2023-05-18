module.exports = ({ db }) => {
    return {
        otherUserImages(otherUsername) {
            let result = db.prepare(`
              SELECT users.login, pictures.title, pictures.path, pictures.description, pictures.id, pictures.owner_id 
              FROM pictures 
              JOIN users ON pictures.owner_id=users.id 
              WHERE users.login = ? 
              ORDER BY pictures.id DESC
            `).all(otherUsername);
            return result;
        },
        otherUserImagesConnected(otherUsername) {
            let result = db.prepare(`SELECT users.login, pictures.title, pictures.description, pictures.path, pictures.owner_id, pictures.id, AVG(scores.score) AS 'score' 
                                    FROM pictures 
                                    LEFT OUTER JOIN scores ON pictures.id = scores.picture_id
                                    JOIN users ON pictures.owner_id=users.id 
                                    WHERE users.login = ? 
                                    GROUP BY pictures.id
                                    ORDER BY pictures.id DESC`).all(otherUsername);
            return result;
        }
    }
}