import os
from importlib.metadata import files

from flask import render_template, redirect, url_for, flash, request, send_from_directory
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from app import db, app, login_manager
from .models import User, Task, Attachment
from .utils import handle_upload, upload_file


@login_manager.user_loader
def user_loader(user_id):
    from .models import User
    return User.query.get(user_id)

@app.route('/')
@login_required
def index():
    page = request.args.get('page', 1, type=int)  # Get the ?page= value from the query string
    per_page = 5  # Items per page
    pagination = Task.query.filter_by(user_id=current_user.id).paginate(page = page, per_page = per_page, error_out=False)
    tasks = pagination.items

    return render_template(
        'index.html',
        tasks=tasks,
        pagination=pagination,
        username=current_user.username,
        preferred_name=current_user.preferred_name,
        profile_picture=current_user.profile_picture
    )


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

            # Handle file uploads
            for file in request.files.getlist('attachments'):
                if file.filename and file.filename != "":
                    upload_success, filename = upload_file(file)
                    attachment = Attachment(filename=filename, task_id=new_task.id)
                    db.session.add(attachment)

            db.session.commit()
            flash('Your task has been created!')

        return redirect(url_for('index'))

    return render_template(
        template_name_or_list='new_task.html',
        username=current_user.username,
        preferred_name=current_user.preferred_name,
        profile_picture=current_user.profile_picture
    )

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

            # Handle file uploads
            for file in request.files.getlist('attachments'):
                if file.filename and file.filename != "":
                    upload_success, filename = upload_file(file)
                    attachment = Attachment(filename=filename, task_id=task.id)
                    db.session.add(attachment)

            db.session.commit()
            flash('Your task has been updated!')

        return redirect(url_for('index'))

    return render_template(
        template_name_or_list='edit_task.html',
        task=task,
    )


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

@app.route('/attachment/<int:attachment_id>/download', methods=['GET'])
@login_required
def download_attachment(attachment_id):
    attachment = Attachment.query.get(attachment_id)
    if not attachment or attachment.task.user_id != current_user.id:
        return '404'

    return send_from_directory('static/uploads/', attachment.filename, as_attachment=True)


@app.route('/attachment/<int:attachment_id>/delete', methods=['POST'])
@login_required
def delete_attachment(attachment_id):
    attachment = Attachment.query.get(attachment_id)
    if not attachment or attachment.task.user_id != current_user.id:
        return '404'

    # delete file from filesystem
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], attachment.filename)
    if os.path.exists(file_path):
        os.remove(file_path)

    db.session.delete(attachment)
    db.session.commit()

    flash('Attachment deleted successfully!')
    return redirect(request.referrer)

@app.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    error = None
    if request.method == 'POST':
        preferred_name = request.form.get('preferred_name')
        current_password = request.form.get('current_password')
        new_password = request.form.get('new_password')
        confirm_password = request.form.get('confirm_password')

        if preferred_name:
            current_user.preferred_name = preferred_name

        if current_password or new_password or confirm_password:
            if not current_user.password == current_password:
                error = 'Invalid current password.'
            elif not new_password == confirm_password:
                error = 'New password and confirmed password do not match.'
            else:
                current_user.password = new_password

        # Handle profile picture upload
        if 'profile_picture' in request.files:
            if request.files['profile_picture'].filename and request.files['profile_picture'].filename != "" :
                upload_success, filename = handle_upload(request, 'profile_picture')
                if upload_success:
                    current_user.profile_picture = filename
                else:
                    error = 'Unable to upload file. Only PNG, JPG, JPEG, and GIF files are supported.'

        if error:
            return render_template(
                template_name_or_list='profile.html',
                error=error,
                username=current_user.username,
                preferred_name=current_user.preferred_name,
                profile_picture=current_user.profile_picture
            )

        db.session.commit()
        flash('Your profile has been updated!')

        return redirect(url_for('index'))

    return render_template(
        template_name_or_list='profile.html',
        username=current_user.username,
        preferred_name=current_user.preferred_name,
        profile_picture=current_user.profile_picture
    )


@app.route('/delete_account', methods=['POST'])
@login_required
def delete_account():
    db.session.delete(current_user)
    db.session.commit()
    flash('Your account has been deleted!')
    return redirect(url_for('index'))
