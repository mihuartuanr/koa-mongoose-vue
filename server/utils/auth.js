function auth(ctx, next){
  console.log('-------auth=========');
  next();
}

module.exports = auth;
