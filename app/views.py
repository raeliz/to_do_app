from flask import render_template, redirect, url_for, flash, request
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from app import db, app, login_manager
from .models import User, Task

@login_manager.user_loader
def user_loader(user_id):
    from .models import User
    return User.query.get(user_id)

@app.route('/')
@login_required
def index():
    user_tasks = Task.query.filter_by(user_id=current_user.id).all()
    return render_template('index.html', tasks=user_tasks)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        user = User.query.filter_by(username=username).first()
        
        if user:
            flash('Username already exists.')
            return redirect(url_for('signup'))
        
        new_user = User(username=username, password=password)
        
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))
        
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        user = User.query.filter_by(username=username).first()
        
        if not user or not user.password == password:
            flash('Please check your login details and try again.')
            return redirect(url_for('login')) 
        login_user(user)
        return redirect(url_for('index'))
        
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))  

@app.route('/new_task', methods=['GET', 'POST'])
@login_required
def new_task():
    if request.method == 'POST':
        title = request.form.get('title')
        description = request.form.get('description')

        if not title:
            flash('Task title is required!')
        else:
            new_task = Task(title=title, description=description, user_id=current_user.id)
            
            db.session.add(new_task)
            db.session.commit()
            flash('Your task has been created!')

        return redirect(url_for('index'))
    
    return render_template('new_task.html')

@app.route('/task/<int:task_id>/done')
@login_required
def done_task(task_id):
    task = Task.query.get(task_id)
    if not task or task.user_id != current_user.id:
        return '404'
    
    task.is_done = True
    db.session.commit()
    return redirect(url_for('index'))

@app.route('/task/<int:task_id>/todo')
@login_required
def todo_task(task_id):
    task = Task.query.get(task_id)
    if not task or task.user_id != current_user.id:
        return '404'
    
    task.is_done = False
    db.session.commit()
    return redirect(url_for('index'))

# Once the GET request for editing the task is received from the client, the server renders the edit_task.html template.
@app.route('/task/<int:task_id>/edit', methods=['GET', 'POST'])
@login_required
def edit_task(task_id):
    task = Task.query.get(task_id)
    if not task or task.user_id != current_user.id:
        return '404'

    if request.method == 'POST':
        title = request.form.get('title')
        description = request.form.get('description')

        if not title:
            flash('Task title is required!')
        else:
            task.title = title
            task.description = description

            db.session.commit()
            flash('Your task has been updated!')

        return redirect(url_for('index'))

    return render_template('edit_task.html', task=task)


# Once the DELETE request is received from the client, the server removes the task from the database.
@app.route('/task/<int:task_id>/delete', methods=['POST'])
@login_required
def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task or task.user_id != current_user.id:
        return '404'

    db.session.delete(task)
    db.session.commit()
    flash('Your task has been deleted!')

    return redirect(url_for('index'))
