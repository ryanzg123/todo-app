CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    google_email TEXT NOT NULL UNIQUE
);

CREATE TABLE Todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    is_completed BOOLEAN NOT NULL DEFAULT 0,
    priority TEXT CHECK( priority IN ('Low', 'Medium', 'High', 'Urgent') ) NOT NULL,
    notes TEXT,
    is_starred BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
