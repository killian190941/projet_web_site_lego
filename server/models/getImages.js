module.exports = ({ db }) => {    
    return {
        getLatestImages() {
            let result = db.prepare(`SELECT users.login, pictures.id, pictures.title, pictures.description, pictures.path, pictures.owner_id, AVG(scores.score) AS 'score'
                                     FROM pictures 
                                     LEFT OUTER JOIN scores ON pictures.id = scores.picture_id
                                     JOIN users ON pictures.owner_id=users.id
                                     GROUP BY pictures.id
                                     ORDER BY pictures.id DESC LIMIT 10`).all();
            return result;
        },
        getOthersImages(myid) {
            let result = db.prepare(`SELECT users.login, pictures.title, pictures.path, pictures.description, pictures.id, pictures.owner_id, AVG(scores.score) AS 'score' 
                                    FROM pictures 
                                    LEFT OUTER JOIN scores ON pictures.id = scores.picture_id
                                    JOIN users ON pictures.owner_id=users.id 
                                    WHERE pictures.owner_id IN (SELECT to_id FROM subscriptions WHERE from_id = ?)
                                    GROUP BY pictures.id
                                    ORDER BY pictures.id DESC`).all(myid);
            return result;
        },
        getMyImages(myid) {
            let result = db.prepare(`SELECT users.login, pictures.title, pictures.description, pictures.path, pictures.id, AVG(scores.score) AS 'score' 
                                    FROM pictures 
                                    LEFT OUTER JOIN scores ON pictures.id = scores.picture_id
                                    JOIN users ON pictures.owner_id=users.id 
                                    WHERE users.id = ? 
                                    GROUP BY pictures.id
                                    ORDER BY pictures.id DESC`).all(myid);
            return result;
        },
        getOtherUserImages(otherUsername) {
                let result = db.prepare(`
                  SELECT users.login, pictures.title, pictures.path, pictures.description, pictures.id, pictures.owner_id 
                  FROM pictures 
                  JOIN users ON pictures.owner_id=users.id 
                  WHERE users.login = ? 
                  ORDER BY pictures.id DESC
                `).all(otherUsername);
                return result;
        },
        getOtherUserImagesConnected(otherUsername) {
                let result = db.prepare(`SELECT users.login, pictures.title, pictures.description, pictures.path, pictures.owner_id, pictures.id, AVG(scores.score) AS 'score' 
                                        FROM pictures 
                                        LEFT OUTER JOIN scores ON pictures.id = scores.picture_id
                                        JOIN users ON pictures.owner_id=users.id 
                                        WHERE users.login = ? 
                                        GROUP BY pictures.id
                                        ORDER BY pictures.id DESC`).all(otherUsername);
                return result;
        },
        getTopImages() {
                let result = db.prepare(`SELECT pictures.id, pictures.title, pictures.description, pictures.path, pictures.owner_id, AVG(scores.score) AS 'score'
                                        FROM pictures 
                                        JOIN scores ON pictures.id = scores.picture_id
                                        GROUP BY pictures.id
                                        ORDER BY score DESC LIMIT 10`).all();
                return result;
        }
    }  
}