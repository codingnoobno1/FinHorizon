import sqlite3

DB_NAME = "fingerprints.db"

def create_database():
    """Create database and users table if not exists."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            fingerprint_id INTEGER UNIQUE NOT NULL
        )
    ''')
    
    conn.commit()
    conn.close()

def insert_user(name, fingerprint_id):
    """Insert a new fingerprint record."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    try:
        cursor.execute("INSERT INTO users (name, fingerprint_id) VALUES (?, ?)", (name, fingerprint_id))
        conn.commit()
        print(f"✅ User {name} (ID: {fingerprint_id}) registered successfully!")
    except sqlite3.IntegrityError:
        print("⚠️ Error: Fingerprint ID already exists!")
    
    conn.close()

def get_user_by_fingerprint(fingerprint_id):
    """Retrieve user by fingerprint ID."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    cursor.execute("SELECT name FROM users WHERE fingerprint_id = ?", (fingerprint_id,))
    user = cursor.fetchone()
    
    conn.close()
    return user[0] if user else None

def get_all_users():
    """Fetch all registered users."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    
    conn.close()
    return users

# Run this once to ensure the database is created
if __name__ == "__main__":
    create_database()
    print("📂 Database initialized!")
