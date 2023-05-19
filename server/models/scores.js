module.exports = ({ db }) => {
    return {
        addScore({picture_id,user_id,score}) {
            db.prepare("INSERT INTO scores(picture_id,user_id,score) VALUES(?,?,?)").run(picture_id, user_id, score);
        },
        checkScore({picture_id,user_id}) {
            return db.prepare("SELECT COUNT(*) as count FROM scores WHERE picture_id =? and user_id =?").get(picture_id,user_id);
        },
        myScore({picture_id,user_id}) {
            let result = db.prepare("SELECT scores.score as score FROM scores WHERE picture_id =? and user_id =?").get(picture_id,user_id);
            return result;
        },
        scoreTotal({picture_id}) {
            return db.prepare("SELECT AVG(score) AS scoreTotal FROM scores WHERE picture_id = ?").get(picture_id);
        },
        nbrVotes({picture_id}) {
            return db.prepare("SELECT COUNT(*) as count FROM scores WHERE picture_id =?").get(picture_id);
        },
    }
}