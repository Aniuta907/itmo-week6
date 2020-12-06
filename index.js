import bodyParser from 'body-parser'
import http from 'http'
import crypto from 'crypto'
import { createReadStream } from 'fs'
import express from 'express';


import appSrc from './app.js';
const app = appSrc(express, bodyParser, createReadStream, crypto, http);

app.listen(process.env.PORT);