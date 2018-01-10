const bcrypt = require('bcrypt');
const uuid = require('uuid');

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt((saltError, salt) => {
            if (saltError) {
                return reject(saltError);
            }
            bcrypt.hash(password, salt, (hashError, hash) => {
                if (hashError) {
                    return reject(hashError);
                }
                return resolve(hash);
            });
        });
    });
}

const USERS = {};

class User {
    constructor(row) {
        this.id = row.id;
        this.email = row.email;
        this.name = row.name;
        this.passwordHash = row.password_hash;

        this.comparePassword = this.comparePassword.bind(this);
    }

    comparePassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, this.passwordHash, function (err, same) {
                if (err) {
                    return reject(err);
                }
                return resolve(same);
            });
        });
    }

    static async save(obj) {
        const existingUser = await User.findOneByEmail(obj.email);
        if (existingUser) {
            const err = new Error('A user exists with this email address: ' + obj.email);
            err.userExists = true;
            throw err;
        }
        const id = obj.id || uuid();
        const passwordHash = await hashPassword(obj.password);
        const user = {
            id,
            email: obj.email,
            name: obj.name,
            password_hash: passwordHash,
        };
        USERS[id] = user;
        return id;
    }

    static findOneById(userId) {
        const user = USERS[userId];
        if (user) {
            return Promise.resolve(new User(user));
        }
        return Promise.resolve(null);
    }

    static findOneByEmail(email) {
        for (const userId of Object.keys(USERS)) {
            const user = USERS[userId];
            if (user.email === email) {
                return Promise.resolve(new User(user));
            }
        }
        return Promise.resolve(null);
    }
}

module.exports = User;
