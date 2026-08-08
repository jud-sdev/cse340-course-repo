import db from './db.js'
import bcrypt from 'bcrypt';

const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, role_id)
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4))
        RETURNING user_id
    `;
    const queryParams = [name, email, passwordHash, default_role];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

// Retrieve a user by their email address, or null if not found
const findUserByEmail = async (email) => {
    const query = `
        SELECT user_id, name, email, password_hash, role_id
        FROM users
        WHERE email = $1
    `;
    const result = await db.query(query, [email]);

    return result.rows.length > 0 ? result.rows[0] : null;
};

// Compare a plain-text password against a stored bcrypt hash
const verifyPassword = async (password, passwordHash) => {
    return await bcrypt.compare(password, passwordHash);
};

// Authenticate a user by email and password; returns the user (without the
// password hash) on success, or null if the credentials are invalid
const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        return null;
    }

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
        return null;
    }

    // Never expose the password hash beyond the model
    delete user.password_hash;
    return user;
};

export { createUser, authenticateUser };
