"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = require("../models/users");
var myUser = new users_1.UserModel();
// Test suite for Orders Model methods
describe('testing if Users methods exist', function () {
    it('testing if index method exist', function () {
        expect(myUser.index).toBeDefined();
    });
    it('testing if show method exist', function () {
        expect(myUser.show).toBeDefined();
    });
    it('testing if create method exist', function () {
        expect(myUser.create).toBeDefined();
    });
});
