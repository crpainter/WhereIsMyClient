import {WhereismyclientApiApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {WhereismyclientApiApplication};

export async function main(options?: ApplicationConfig) {
  const app = new WhereismyclientApiApplication(options);
  await app.boot();
  await app.start();
  return app;
}
