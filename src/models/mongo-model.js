'use strict';

class Model {

  /**
   * Takes in schema to check against incoming post or put models
   * @param {*} schema 
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * Gets method
   * @param {*} _id 
   */
  get(_id) {
    let queryObject = _id ? {_id} : {};
    return this.schema.find(queryObject);
  }
  /**
   * Creates new record and puts it in the database, then returns it to the route function
   * @param {*} record 
   */
  post(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }
/**
 * Checks if record input is valid, saves it and returns the record
 * @param {*} _id 
 * @param {*} record 
 */
  put(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, {new:true});
  }
/**
 * Deletes record with specified id
 * @param {*} _id 
 */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }

}

module.exports = Model;
