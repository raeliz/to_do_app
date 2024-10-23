from flask_login import UserMixin
from . import db


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    preferred_name = db.Column(db.String(100))
    profile_picture = db.Column(db.String(100), nullable=True)
    tasks = db.relationship('Task')


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.String(1000))
    is_done = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
