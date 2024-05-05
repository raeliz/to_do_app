from flask import render_template, redirect, url_for, request
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from . import db, login_manager
from .models import User, Task

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
@login_required
def index():
    return 'Hello, World!'

# TODO: add the rest of your views here

