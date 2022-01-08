"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var orders_1 = __importDefault(require("./handlers/orders"));
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var services_1 = __importDefault(require("./handlers/services"));
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Our main route is working');
});
(0, orders_1.default)(app);
(0, users_1.default)(app);
(0, products_1.default)(app);
(0, services_1.default)(app);
app.listen(process.env.PORT, function () {
    console.log("App is running on port ".concat(process.env.PORT));
});
