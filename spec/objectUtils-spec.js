import test from "tape";

import {createUuid, clone, hasNoRealValue, hasProperty, removeProperty} from "../src/objectUtils";

test("createUuid should create a unique valid uuid", (assert) => {
  const uuid = createUuid();
  const uuid2 = createUuid();
  assert.equal(uuid.length, 36);
  assert.equal(uuid2.length, 36);
  assert.notEqual(uuid, uuid2);
  assert.end();
});

test("hasNoRealValue should should work for an object with values", (assert) => {
  const obj = {
    value1: "wobble",
    value2: 12,
    value3: "13",
    value4: "05:02",
    value5: "02:05:03"
  };

  for (let prop in obj) {
    assert.notOk(hasNoRealValue(obj, prop), "should be false for " + prop + " with " + obj[prop] + "]");
  }
  assert.end();
});

test("hasNoRealValue should should work for an object with NO values", (assert) => {
  const obj = {
    value1: "",
    value2: null,
    value3: "00:00",
    value4: "00:00:00",
    value5: 0,
    value6: -1,
  };
  for (let prop in obj) {
    assert.ok(hasNoRealValue(obj, prop), "should be true for " + prop + " with [" + obj[prop] + "]");
  }
  assert.ok(hasNoRealValue(obj, "doesNotExist"), "should be true for undefined");
  assert.end();
});

test("hasNoRealValue should should work for a string with a value", (assert) => {
  const value = "wobble";
  assert.notOk(hasNoRealValue(value), "should be false for [" + value + "]");
  assert.end();
});

test("hasNoRealValue should should work for a string with NO value", (assert) => {
  const value = "";
  assert.ok(hasNoRealValue(value), "should be true for [" + value + "]");
  assert.end();
});

test("hasNoRealValue should should work for null", (assert) => {
  const value = null;
  assert.notOk(hasNoRealValue(value), "should be false for [" + value + "]");
  assert.end();
});

test("clone should clone with real numerics", (assert) => {
  const obj = {
    age: 40
  };
  assert.equal((typeof clone(obj).age), "number", "should be number for [" + obj.age + "]");
  assert.end();
});

test("clone should work with a string", (assert) => {
  const obj = "mystring";
  assert.equal((typeof clone(obj)), "string", "should be string for [" + obj + "]");
  assert.equal(clone(obj), "mystring");
  assert.end();
});

test("clone should work with null", (assert) => {
  const obj = null;
  assert.equal((typeof clone(obj)), "object", "should be null for [" + obj + "]");
  assert.equal(clone(obj), null);
  assert.end();
});

test("hasProperty should work with filled objectproperty", (assert) => {
  const obj = {"uuid": "sdkjh-kdsj-495-ldsv"};
  assert.equal(hasProperty(obj, "uuid"), true, "should conclude true");
  assert.end();
});

test("hasProperty should work with empty object", (assert) => {
  const obj = {};
  assert.equal(hasProperty(obj, "uuid"), false, "should conclude false for empty object");
  assert.end();
});

test("hasProperty should work with null object", (assert) => {
  const obj = null;
  assert.equal(hasProperty(obj, "uuid"), false, "should conclude false for null object");
  assert.end();
});

test("hasProperty should work with defined key with undefined object", (assert) => {
  const obj = {"uuid": [undefined]};
  assert.equal(hasProperty(obj, "uuid"), true, "should conclude true for undefined value");
  assert.end();
});

test("removeProperty happyflow", (assert) => {
  const obj = {
    "uuid": "98456fgjdkj",
    "name": "wobble",
  };
  const newObj = removeProperty(obj, "uuid");
  assert.equal(JSON.stringify(obj), '{"uuid":"98456fgjdkj","name":"wobble"}');
  assert.equal(JSON.stringify(newObj), '{"name":"wobble"}');
  assert.equal(hasProperty(newObj, "uuid"), false, "should remove a property");
  assert.equal(hasProperty(newObj, "name"), true, "should not remove another property");
  assert.end();
});

test("removeProperty should work on non-existing property", (assert) => {
  const obj = {
    uuid: "98456fgjdkj",
    name: "wobble",
  };
  const newObj = removeProperty(obj, "not_here");
  assert.equal(hasProperty(newObj, "uuid"), true, "should not remove a property");
  assert.equal(hasProperty(newObj, "name"), true, "should not remove another property");
  assert.end();
});

