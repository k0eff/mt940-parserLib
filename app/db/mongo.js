/* eslint-disable new-cap */

'use strict';

const { MongoClient } = require('mongodb');
const EventEmitter = require('events');


module.exports = () => class MongoStorage extends EventEmitter {
	constructor({
		uri = 'mongodb://localhost:27017',
		dbName, // required
		collectionName = 'mt940',
	} = {}) {
		super();
		this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		this.client.on('error', e => this.emit('error', e));
		this.client.on('close', e => this.emit('disconnect', e));
		this.client.on('disconnect', e => this.emit('disconnect', e));

		this.dbName = dbName;
		this.collectionName = collectionName;
		this.uri = uri;

		this._isConnected = false;
		this._isConnecting = false;
		this._collection = null;
	}

	async connect() {
		if (this._isConnected && this._isConnecting) return;
		if (!this.dbName) throw new Error('Error: Database name not supplied');

		try {
			this._isConnecting = true;

			await this.client.connect();
			this._collection = this.client.db(this.dbName).collection(this.collectionName);

			this._isConnected = true;
			this._isConnecting = false;
		} catch (e) {
			this._isConnected = true;
			this._isConnecting = false;
			throw e;
		}
	}

	async write(data) {
		return this._collection.updateMany(data, { $set: data }, { upsert: true });
	}
};
