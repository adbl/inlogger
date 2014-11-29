USERNAME_OR_PASSWORD_MISSING = "login or password is missing"
USERNAME_TAKEN = "this login name is already taken"


def signup(db, username, password):
    if username is '' or password is '':
        return False, USERNAME_OR_PASSWORD_MISSING
    c = db.cursor()
    if c.execute('SELECT id FROM users WHERE id=?', [username]).fetchone():
        return False, USERNAME_TAKEN
    # TODO use hash+salt
    c.execute('INSERT INTO users VALUES (?,?)', [username, password])
    db.commit()
    return True, None


def login(db, username):
    c = db.cursor()
    c.execute('INSERT INTO logins (user_id) VALUES (?)', [username])
    db.commit()
    return True
