'use strict';

const uuid = require('uuid/v4');

class Model {

  /**
   * Takes in schema from one of the models, uses it to make objects of that model type
   * @param {*} schema 
   */
  constructor(schema) {
    this.schema = schema;
    this.database = [];
  }

  /**
   * Checks for every required schema feild when making the post or put request with new entry
   * @param {} entry 
   */
  sanitize(entry) {

    let valid = true;
    let record = {};

    Object.keys(this.schema).forEach( field => {
      if ( this.schema[field].required ) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });
    
    return valid ? record : undefined;
  }
  /**
   * Returns count
   */
  count() {
    return this.database.length;
  }

  /**
   * Finds model with that id in database
   * @param {*} id 
   */
  get(id) {
    const records = id ? this.database.filter( (record) => record._id === id ) : this.database;
    return Promise.resolve(records);
  }

  /**
   * Post route that inserts a record
   * @param {*} entry 
   */
  post(entry) {
    entry._id = uuid();
    let record = this.sanitize(entry);
    if ( record._id ) { this.database.push(record); }
    return Promise.resolve(record);
  }
  /**
   * deletes a record
   * @param {} id 
   */
  delete(id) {
    this.database = this.database.filter((record) => record._id !== id );
    return this.get(id);
  }
/**
 * Updates a record
 * @param {*} id 
 * @param {*} entry 
 */
  put(id, entry) {
    let record = this.sanitize(entry);
    if( record._id ) { this.database = this.database.map((item) => (item._id === id) ? record : item  ); }
    return this.get(id);
  }
  
}

module.exports = Model;