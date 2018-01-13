const util = require('util');
const User = require('../server/models/User');
const Settlement = require('../server/models/Settlement');

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
    let userCount = 0;
    for (const user of require('./dummy-users')) {
        if (userCount >= 10) {
            // Only load first 10 users
            break;
        }
        userCount += 1;
        user.id = '0d327d43-9770-4ad0-9dfa-0014b88f040' + userCount;
        const userId = await User.save(user);
        console.log('Created user: %j', user);

        const numSettlements = Math.floor(1 + Math.random() * 5);
        for (let i = 0; i <= numSettlements; i++) {
            const settlementId = await Settlement.save({
                id: userCount + 'e5dac36-be14-4a9c-8f59-d7dcfd25344' + i,
                userId,
                name: 'Sample Settlement for ' + user.name + ' #' + i,
            });
            console.log('Added a settlement id=%s for userId=%s', settlementId, userId);
        }
    }
}

populateSampleData()
    .catch((err) => {
        console.error('Error loading sample data: %s', err);
        process.exit(1);
    })
