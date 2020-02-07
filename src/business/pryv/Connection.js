// @flow

const request = require('superagent');
const url = require('url');

class Connection {
  pryvApiEndpoint: string;

  constructor(pryvApiEndpoint: string) {
    this.pryvApiEndpoint = pryvApiEndpoint;
    console.log('connection booted with endpoint', this.pryvApiEndpoint);
  }

  async createEvent(event: Object): Promise<any> {
    console.log('Create Pryv event for', buildUrl('/events'));
    return await request.post(buildUrl('/events')).send(event);
  }
}

function buildUrl(path: string): string {
  return url.resolve(this.pryvApiEndpoint, path);
}

module.exports = Connection;
