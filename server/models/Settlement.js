const uuid = require('uuid');

const PROJECTS = {};

class Settlement {
    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.userId = row.user_id;
    }

    static async save(obj) {
        const id = obj.id || uuid();
        const row = {
            id,
            user_id: obj.userId,
            name: obj.name,
        };
        PROJECTS[id] = row;
        return id;
    }

    static findOneById(settlementId) {
        const row = PROJECTS[settlementId];
        if (row) {
            return Promise.resolve(new Settlement(row));
        }
        return Promise.resolve(null);
    }

    static findByUserId(userId) {
        const list = [];
        for (const settlementId of Object.keys(PROJECTS)) {
            const row = PROJECTS[settlementId];
            if (row.user_id === userId) {
                list.push(new Settlement(row));
            }
        }
        return Promise.resolve(list);
    }
}

module.exports = Settlement;
