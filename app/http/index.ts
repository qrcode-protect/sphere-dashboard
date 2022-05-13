/*************** REGISTER ALL CONTROLLERS ***************/
// const filesControllers = require.context('app/http/controllers', false, /\.js$/);
// const exceptControllers = ['user-help-controller'];
let controllers = {
  // api    : require('@app/http/controllers/api-controller').default,
  // auth   : require('@app/http/controllers/auth-controller').default,
  // upload : require('@app/http/controllers/upload-controller').default,
  // example: require('@app/http/controllers/example-controller').default,
};


// filesControllers.keys()
//   .map(file => file.replace('./', '').replace('.js', ''))
// .map(file => (file.match(/(?<=\.\/)(.*?)(?=\.js)/) || [""])[0])
// .filter(file => file && file.trim() !== '' && !exceptControllers.includes(file))
// .forEach(file => controllers[file.replace('-controller', '')] = require(`app/http/controllers/${file}`).default);

export {
  controllers
}

/*************** REGISTER ALL MIDDLEWARE ***************/
// const filesMiddleware = require.context('app/http/middleware', false, /\.js$/);
// const exceptMiddleware = [];
let middleware = {
  // auth : require('@app/http/middleware/auth-middleware').default,
  // guest: require('@app/http/middleware/guest-middleware').default
};


// filesMiddleware.keys()
//   .map(file => file.replace('./', '').replace('.js', ''))
// .map(file => (file.match(/(?<=\.\/)(.*?)(?=\.js)/) || [""])[0])
// .filter(file => file && file.trim() !== '' && !exceptMiddleware.includes(file))
// .forEach(file => middleware[file.replace('-middleware', '')] = require(`app/http/middleware/${file}`).default);

export {
  middleware
}
