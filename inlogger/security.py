def authenticate(db, username, password):
    row = db.cursor().execute(
        'SELECT password FROM users WHERE id=?', [username]).fetchone()
    if row:
        (userpass,) = row
        return password == userpass
    return False
