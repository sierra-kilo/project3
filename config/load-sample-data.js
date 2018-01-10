const User = require('../server/models/User');
const Project = require('../server/models/Project');

async function addDummyUser(user) {
    if (!user.password || user.password.length < 8) {
        throw new Error('Password is too short: ' + user.password);
    }
    const passwordHash = await hashPassword(user.password);
    const id = uuid();
    USERS[id] = {
        id,
        name: user.name,
        email: user.email,
        password_hash: passwordHash
    };
}

async function populateSampleData() {
    for (const user of require('./dummy-users')) {
        const userId = await User.save(user);
        console.log('Created user: %j', user);

        const projectId = await Project.save({
            userId,
            name: 'A Sample Project',
        });
        console.log('Added a project id=%s for userId=%s', projectId, userId);

    }
}

populateSampleData()
    .catch((err) => {
        console.error('Error loading sample data: %s', err);
        process.exit(1);
    })