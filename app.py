# app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:12345678@localhost/test_case_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class TestCase(db.Model):
    __tablename__ = 'ok'
    __table_args__ = {'schema': 'testcases'}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    estimate_time = db.Column(db.String, nullable=False)
    module = db.Column(db.String, nullable=False)
    priority = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=False)

# Ensure the app context is set up correctly
with app.app_context():
    db.create_all()
