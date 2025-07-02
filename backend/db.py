import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="YourNewPassword123",
        database="login_system"
    )
