from flask import Flask, request, g
from flask.ext.httpauth import HTTPBasicAuth
import sqlite3
from . import security
from . import user

DATABASE = '/mnt/db/inlogger.sqlite3'

app = Flask(__name__, static_url_path='')
app.config.from_object(__name__)
auth = HTTPBasicAuth()


@auth.verify_password
def authenticate(username, password):
    return security.authenticate(g.db, username, password)


def connect_db():
    # TODO make sure db is actually present
    return sqlite3.connect(app.config['DATABASE'])


@app.before_request
def before_request():
    g.db = connect_db()


@app.teardown_request
def teardown_request(exception):
    db = getattr(g, 'db', None)
    if db:
        db.close()


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/login', methods=['POST'])
@auth.login_required
def login():
    user.login(g.db, auth.username())
    return respond("", 200)


@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()             # TODO handle json parse fail
    username = data.get('username', '')
    password = data.get('password', '')
    result, reason = user.signup(g.db, username, password)
    if result:
        # TODO not used..
        return respond("", 201, {'location': "/api/login/%s" % username})
    elif reason is user.USERNAME_TAKEN:
        return respond(user.USERNAME_TAKEN, 409)
    else:
        return respond(reason, 400)


def respond(data, code, headers=None):
    if headers is None:
        headers = {}
    if isinstance(data, basestring):
        headers['content-type'] = 'text/plain'
    return data, code, headers
