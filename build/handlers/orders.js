"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var orders_1 = require("../models/orders");
var ordersLibrary = new orders_1.OrderModel();
// handlers functions
// index function to show al items in our database
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allOrders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ordersLibrary.index()];
            case 1:
                allOrders = _a.sent();
                try {
                    res.json(allOrders);
                }
                catch (err) {
                    res.status(400).send("cant get oders .Error :".concat(err));
                }
                return [2 /*return*/];
        }
    });
}); };
// Show function to show a specified book in our database
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, specifiedOrder;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, ordersLibrary.show(id)];
            case 1:
                specifiedOrder = _a.sent();
                try {
                    res.json(specifiedOrder);
                }
                catch (err) {
                    res.status(400).send("Cant get order with id: ".concat(id, " .Error :").concat(err));
                }
                return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizationHeader, token, orderSpec, newOrder, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Validating User token
                try {
                    authorizationHeader = req.headers.authorization;
                    token = authorizationHeader.split(' ')[1];
                    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
                }
                catch (err) {
                    res.status(401);
                    res.json('Access denied ,invalid Token ');
                    // we must use "return " to exit the function when the token is not valid
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                orderSpec = {
                    status: req.body.status,
                    user_id: req.body.user_id
                };
                return [4 /*yield*/, ordersLibrary.create(orderSpec)];
            case 2:
                newOrder = _a.sent();
                res.json(newOrder);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400).json(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizationHeader, token, id, deletedOrder, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Validatin user token
                try {
                    authorizationHeader = req.headers.authorization;
                    token = authorizationHeader.split(' ')[1];
                    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
                }
                catch (err) {
                    res.status(401);
                    res.json('Access denied . Token is invalid');
                    // we must use "return " to exit the function when the token is not valid
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                id = parseInt(req.params.id, 10);
                return [4 /*yield*/, ordersLibrary.destroy(id)];
            case 2:
                deletedOrder = _a.sent();
                res.json(deletedOrder);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400).json(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var addProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var quantity, orderId, productId, newOrderProducts, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                quantity = req.body.quantity;
                orderId = parseInt(req.params.id, 10);
                productId = req.body.product_id;
                return [4 /*yield*/, ordersLibrary.addProduct(quantity, orderId, productId)];
            case 1:
                newOrderProducts = _a.sent();
                res.json(newOrderProducts);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400).json("Cant add new order_product .Err ".concat(err_3));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// A function to show the current active order(s) for a specific user
var userCurrentOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizationHeader, token, userId, userActiveOrders, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Validating User token
                try {
                    authorizationHeader = req.headers.authorization;
                    token = authorizationHeader.split(' ')[1];
                    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
                }
                catch (err) {
                    res.status(401);
                    res.json('Access denied ,invalid Token ');
                    // we must use "return " to exit the function when the token is not valid
                    return [2 /*return*/];
                }
                userId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ordersLibrary.userCurrentOrders(parseInt(userId, 10))];
            case 2:
                userActiveOrders = _a.sent();
                res.json(userActiveOrders);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(400).json("Cant get active order for user id =".concat(userId, " .Err ").concat(err_4));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var ordersRoutes = function (app) {
    app.get('/orders', index);
    app.get('/order/:id', show);
    app.post('/newOrder', create);
    app.delete('/delete/:id', destroy);
    app.post('/order/:id/products', addProduct);
    app.get('/userCurrentOrders/:id', userCurrentOrders);
};
exports.default = ordersRoutes;
