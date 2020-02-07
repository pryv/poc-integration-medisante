// @flow

const request = require('superagent');
const url = require('url');

class Connection {
  pryvApiEndpoint: string;

  constructor(pryvApiEndpoint: string) {
    this.pryvApiEndpoint = pryvApiEndpoint;
  }

  async createEvent(event: Object): Promise<any> {
    return await request.post(buildUrl('/events')).send(event);
  }
}

function buildUrl(path: string): string {
  return url.resolve(`${this.pryvApiEndpoint}`, path);
}

module.exports = Connection;
