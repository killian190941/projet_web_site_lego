module.exports = ({ db }) => {
    
    return {
        getLatestImages() {
            let result = db.prepare(`SELECT users.login, pictures.title, pictures.path 
                                     FROM pictures 
                                     JOIN users ON pictures.owner_id=users.id 
                                     ORDER BY pictures.id DESC LIMIT 10`).all();
            return result;
        },
        getOthersImages(myid) {
            let result = db.prepare(`SELECT users.login, pictures.title, pictures.path 
                                    FROM pictures 
                                    JOIN users ON pictures.owner_id=users.id 
                                    WHERE pictures.owner_id IN (SELECT to_id FROM subscriptions WHERE from_id = ?)
                                    ORDER BY pictures.id DESC`).all(myid);
            return result;
        },
        getMyImages(myid) {
            let result = db.prepare(`SELECT users.login, pictures.title, pictures.description, pictures.path, pictures.id 
                                    FROM pictures 
                                    JOIN users ON pictures.owner_id=users.id 
                                    WHERE users.id = ? 
                                    ORDER BY pictures.id DESC`).all(myid);
            return result;
        }
    }   
}