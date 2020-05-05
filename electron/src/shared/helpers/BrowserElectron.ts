// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let electron: any;

if (process.env.ENVIRONMENT === 'test') electron = require('electron');
else electron = window.require('electron');
