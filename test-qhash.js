'use strict';

var assert = require('qassert');
var qhash = require('./');

describe ('qhash', function() {
    describe ('_merge', function() {
        function testMergeDataset( dataset ) {
            for (var i=0; i<dataset.length; i++) {
                var target = dataset[i][0];
                var source = dataset[i][1];
                var expect = dataset[i][2];

                qhash.merge(target, source);
                assert.deepEqual(target, expect);
            }
        }

        it ('should merge hashes', function(done) {
            var dataset = [
                [ {}, {a:1}, {a:1} ],
                [ {a:{}}, {a:1}, {a:1} ],
                [ {a:1}, {a:{b:2}}, {a:{b:2}} ],
                [ {a:{b:1}}, {a:{c:2}}, {a:{b:1, c:2}} ],
            ];

            testMergeDataset(dataset);

            done();
        })

        it ('should not reuse any source sub-hash', function(done) {
            done();
        })

        it ('should assign class-ed properties directly', function(done) {
            done();
        })

        it ('should merge into `this` if no target specified', function(done) {
            done();
        })

        describe ('options', function() {
            it ('noOverwrite should not alter existing properties', function(done) {
                done();
            })
        })
    })

    describe ('get', function() {
        it ('should return property', function(done) {
            done();
        })

        it ('should return undefined if no such property', function(done) {
            done();
        })

        it ('should get from `this` if no target specified', function(done) {
            done();
        })
    })

    describe ('set', function() {
        function testSetDataset( dataset ) {
            for (var i=0; i<dataset.length; i++) {
                var target = dataset[i][0];
                var name = dataset[i][1];
                var value = dataset[i][2];
                var expect = dataset[i][3];

                qhash.set(target, name, value);
                assert.deepEqual(target, expect);
            }
        }

        it ('should set property', function(done) {
            var dataset = [
                [ {}, 'a', 1, {a:1} ],
                [ {}, 'b', [1], {b:[1]} ],
                [ {a:1}, 'b', 2, {a:1, b:2} ],
                [ {b:1}, 'a', 2, {b:1, a:2} ],
            ];

            testSetDataset(dataset);

            done();
        })

        it ('should create missing hashes', function(done) {
            var dataset = [
                [ {}, 'a.b', 2, {a:{b:2}} ],
                [ {}, 'a.b', {c:3, d:[4]}, {a:{b:{c:3, d:[4]}}} ],
                [ {}, 'a.b.c', {d:1}, {a:{b:{c:{d:1}}}} ],
            ];

            testSetDataset(dataset);

            done();
        })

        it ('should overwrite existing property', function(done) {
            var dataset = [
                [ {a:1}, 'a', 2, {a:2} ],
                [ {a:1}, 'a', null, {a:null} ],
                [ {a:{b:1}}, 'a.b', 2, {a:{b:2}} ],
                [ {a:{b:1}}, 'a.b', {c:3}, {a:{b:{c:3}}} ],
                [ {a:{b:1}}, 'a', 3, {a:3} ],
            ];

            testSetDataset(dataset);

            done();
        })

        it ('should merge nested property into sub-hash', function(done) {
            // ...
            done();
        })

        it ('should set property to given object', function(done) {
            var x = {b:1};
            var target = {a:0};
            qhash.set(target, 'a', x);
            assert.strictEqual(target.a, x);
            done();
        })

        it ('should set on `this` if no target specified', function(done) {
            var target = {};
            target.set = qhash.set;
            target.set('a.b', 3);
            assert.deepEqual(target.a, {b:3});
            done();
        })
    })

    describe ('selectField', function() {
    })

    describe ('decorate', function() {
        it ('should attach methods', function(done) {
            var fn = function(){};
            var target = qhash.decorate({fn: 1, fn2: 2}, {fn: fn}, {});
            assert.strictEqual(target.fn, fn);
            assert.strictEqual(target.fn2, 2);
            done();
        })

        it ('should not overwrite', function(done) {
            var fn = function(){};
            var target = qhash.decorate({fn: 1}, {fn: fn}, {noOverwrite: true});
            assert.strictEqual(target.fn, 1);
            done();
        })

        it ('should hide attached methods', function(done) {
            var fn = function(){};
            var target = qhash.decorate({}, {fn: fn}, {hide: true});
            assert.equal(target.fn, fn);
            assert.deepEqual(target, {});       // <-- odd one
            assert('fn' in target);             // <-- another odd one
            assert.ok(Object.keys(target).indexOf('fn') < 0);
            done();
        })
    })
})