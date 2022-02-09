const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = class UserService {
  //  * exchange code for token
  //  * get info from github about user with token
  //  * get existing user if there is one
  //  * if not, create one
  // */
  static async create(code) {
    const token = await exchangeCodeForToken(code);
    const { login, email, avatar_url } = await getGithubProfile(token);

    let user = await GithubUser.findByUsername(login);

    if(!user) {
      user = await GithubUser.insert({ username: login, email, avatar: avatar_url });
    }
    return user;
  }
};
