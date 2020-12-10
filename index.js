import bodyParser from 'body-parser'
import http from 'http'
import crypto from 'crypto'
import { createReadStream } from 'fs'
import express from 'express';
import mongo from 'mongodb';

import appSrc from './app.js';

const { MongoClient: { connect } } = mongo
const app = appSrc(express, bodyParser, createReadStream, crypto, http, connect);

app.listen(process.env.PORT);