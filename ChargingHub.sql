CREATE TABLE IF NOT EXISTS ChargingPoints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    address TEXT NOT NULL,
    charging_type TEXT NOT NULL CHECK (charging_type IN ('fast', 'standard', 'slow')),
    availability TEXT NOT NULL CHECK (availability IN ('occupied', 'available', 'offline')),
    created_at TEXT NOT NULL DEFAULT current_timestamp,
    updated_at TEXT NOT NULL DEFAULT current_timestamp
);

INSERT INTO ChargingPoints (address, charging_type, availability) VALUES ('Amman, Jordan', 'fast', 'available');