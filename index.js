import bodyParser from 'body-parser'
import http from 'http'
import crypto from 'crypto'
import { createReadStream, writeFileSync } from 'fs'
import express from 'express';
import mongo from 'mongodb';

import appSrc from './app.js';

const { MongoClient: { connect } } = mongo
const app = appSrc(express, bodyParser, createReadStream, crypto, http, connect, writeFileSync);

app.listen(process.env.PORT);