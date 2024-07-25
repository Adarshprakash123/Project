from app import app, db, TestCase

with app.app_context():
    db.create_all()

    # Optionally, insert some test data
    if not TestCase.query.first():
        test_cases = [
            TestCase(name='Test Case 1', estimate_time='5 Minutes', module='Onboarding', priority='Low', status='Select'),
            TestCase(name='Test Case 2', estimate_time='5 Minutes', module='User Log In', priority='Medium', status='Select'),
            TestCase(name='Test Case 3', estimate_time='5 Minutes', module='Password', priority='High', status='Select')
        ]
        db.session.add_all(test_cases)
        db.session.commit()
