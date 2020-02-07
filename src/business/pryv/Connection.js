// @flow

const request = require('superagent');
const url = require('url');

class Connection {

  token: ?string;
  username: string;
  coreUrl: string;

  constructor(settings: Object, username: string, token: ?string) {
    this.username = username;
    this.coreUrl = settings.get('core:url');
    this.token = token;
  }

  buildUrl(path: string): string {
    return url.resolve(`${this.coreUrl}/${this.username}`, path);
  }

  async createEvent(event: Object): Promise<any> {
    return await request
      .post(buildUrl('/events'))
      .send(event);
  }
}

module.exports = Connection;
