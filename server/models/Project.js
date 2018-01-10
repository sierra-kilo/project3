const uuid = require('uuid');

const PROJECTS = {};

class Project {
    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.userId = row.user_id;
    }

    static async save(obj) {
        const id = uuid();
        const row = {
            id,
            user_id: obj.userId,
            name: obj.name,
        };
        PROJECTS[id] = row;
        return id;
    }

    static findOneById(projectId) {
        const row = PROJECTS[projectId];
        if (row) {
            return Promise.resolve(new Project(row));
        }
        return Promise.resolve(null);
    }

    static findByUserId(userId) {
        const list = [];
        for(const projectId of Object.keys(PROJECTS)) {
            const row = PROJECTS[projectId];
            if (row.user_id === userId) {
                list.push(new Project(row));
            }
        }
        return Promise.resolve(list);
    }
}

module.exports = Project;
