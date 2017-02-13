module.exports = {
  servers: {
    one: {
      host: '107.170.50.30',
      username: 'root',
      //password: 'Jocote34'
      pem: './id_rsa'
    }
  },

  meteor: {
    name: 'civitar',
    path: 'D:/Documents/Websites/civitar/civitar-master',
    servers: {
      one: {}
    },
    buildOptions: {
      debug: true
    },
    env: {
      ROOT_URL: 'http://107.170.50.30',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 90
  },
  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
