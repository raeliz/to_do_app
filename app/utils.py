import os
from typing import Tuple, Optional

from werkzeug.utils import secure_filename
from app import app

def _allowed_file(filename: str):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}


def handle_upload(request, request_file) -> Tuple[bool, Optional[str]]:
    file = request.files[request_file]
    if file and _allowed_file(file.filename):
        filename = secure_filename(file.filename)

        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            os.mkdir(app.config['UPLOAD_FOLDER'])

        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        return True, filename
    return False, None
