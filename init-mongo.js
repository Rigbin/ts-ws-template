db.createUser({
  user: 'root',
  pwd: 'toor',
  roles: [
    {
      role: 'readWrite',
      db: 'dev',
    },
  ],
});

db = new Mongo().getDB('dev');

db.createCollection('users', { capped: false });
db.createCollection('articles', { capped: false });

db.articles.insert([
  {
    number: '123-456',
    name: 'testarticle',
    description: 'some testarticle',
  },
  {
    number: '654-321',
    name: 'otherarticle',
    description: 'other testarticle',
  },
]);
