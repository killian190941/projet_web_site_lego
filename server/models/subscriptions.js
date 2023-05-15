module.exports = ({ db }) => {
    return {
        subscribe({from_id,to_id}) {
            db.prepare("INSERT INTO subscriptions(from_id,to_id) VALUES(?,?)").run(from_id, to_id);
        },
        unsubscribe({from_id,to_id}) {
            return db.prepare("DELETE FROM subscriptions WHERE from_id=? and to_id=?").run(from_id, to_id);
        },
        checksubscribe({from_id,to_id}) {
            return db.prepare("SELECT COUNT(*) as count FROM subscriptions WHERE from_id =? and to_id =?").get(from_id, to_id);
        },
        listsubscribe({from_id}) {
            return db.prepare("SELECT to_id FROM subscriptions WHERE from_id=?").all(from_id);
        }
    }
}