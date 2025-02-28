/**
 * @license
 * Copyright (C) Pryv https://pryv.com
 * This file is part of Pryv.io and released under BSD-Clause-3 License
 * Refer to LICENSE file
 */
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
    return await request.post(this.buildUrl('/events')).send(event);
  }

  buildUrl(path: string): string {
    return url.resolve(this.pryvApiEndpoint, path);
  }
}

module.exports = Connection;
