from sqlalchemy import Column, Integer, String
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class TestCase(db.Model):
    __tablename__ = 'test_cases'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    estimateTime = Column(String, nullable=False)
    module = Column(String, nullable=False)
    priority = Column(String, nullable=False)
    status = Column(String, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'estimateTime': self.estimateTime,
            'module': self.module,
            'priority': self.priority,
            'status': self.status
        }
