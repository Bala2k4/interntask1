from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import traceback  # For full error logging

app = Flask(__name__)
CORS(app)

# ✅ Update with your actual MySQL credentials
DB_CONFIG = {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "YourNewPassword123",  # ← Replace with your actual MySQL password
    "database": "login_system"
}


def get_conn():
    """Create and return a new MySQL connection."""
    return mysql.connector.connect(**DB_CONFIG)


@app.post("/register")
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(
                "INSERT INTO users (email, password) VALUES (%s, %s)",
                (email, password)
            )
            conn.commit()
        return jsonify({"msg": "User registered"}), 201

    except mysql.connector.Error as e:
        print("MYSQL ERROR:", e)
        traceback.print_exc()  # 👈 Print full traceback for debug
        if e.errno == 1062:  # Duplicate email
            return jsonify({"msg": "Email already registered"}), 409
        return jsonify({"msg": "DB error"}), 500


@app.post("/login")
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    try:
        with get_conn() as conn, conn.cursor(dictionary=True) as cur:
            cur.execute("SELECT password FROM users WHERE email=%s", (email,))
            user = cur.fetchone()

            if user and user["password"] == password:
                return jsonify({"msg": f"Welcome {email}!"}), 200
            else:
                return jsonify({"msg": "Invalid email or password"}), 401

    except mysql.connector.Error as e:
        print("MYSQL ERROR:", e)
        traceback.print_exc()  # 👈 Print full traceback for debug
        return jsonify({"msg": "DB error"}), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)
