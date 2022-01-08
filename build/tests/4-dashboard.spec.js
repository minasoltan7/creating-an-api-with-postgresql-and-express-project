"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dashboard_1 = __importDefault(require("../services/dashboard"));
var myDashboard = new dashboard_1.default();
// Test suite for Orders Model methods
describe('testing if dashboard methods', function () {
    it('testing if productsInOrders method exist', function () {
        expect(myDashboard.productsInOrders).toBeDefined();
    });
    it('testing if usersInOrders method exist', function () {
        expect(myDashboard.usersInOrders).toBeDefined();
    });
    it('testing if mostExpesive5 method exist', function () {
        expect(myDashboard.mostExpesive5).toBeDefined();
    });
});
