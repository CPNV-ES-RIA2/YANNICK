import Dexie from 'dexie';

const db = new Dexie('ria');
db.version(2).stores({
    analyses: '++id, date, labels, numberOfLabel, minConfidence, averageConfidence, image',
});

export default db;