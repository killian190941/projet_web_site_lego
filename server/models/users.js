module.exports = ({ db }) => {

    return {
        register(user) {
            db.prepare("INSERT INTO users(login,password,email) VALUES (?,?,?)").run(user.login, user.password, user.email);
        },
        getByLogin(login) {
            return db.prepare("SELECT * FROM users WHERE login=?").get(login);
        },
        list() {
            return db.prepare("SELECT * FROM users").all();
        },
        updatePassword(id,password) {
            db.prepare("UPDATE users SET password=? WHERE id=?").run(password,id);
        },
        updateEmail(id,email) {
            db.prepare("UPDATE users SET email=? WHERE id=?").run(email,id);
        }
    }

}