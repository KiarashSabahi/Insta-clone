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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const multer_1 = __importDefault(require("multer"));
require("./db/DBConnection");
const user_1 = __importDefault(require("./routes/user"));
const post_1 = __importDefault(require("./routes/post"));
const cors_1 = require("./middleware/cors");
const app = express_1.default();
const port = process.env.PORT;
// app.set("view engine", "");
// app.set("views", "../views");
app.use(body_parser_1.json());
app.use(cookie_parser_1.default());
app.use(cors_1.setCORS);
app.use(multer_1.default({ dest: "../images" }).single("image"));
app.use("/user", user_1.default);
app.use("/post", post_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`server is up and running on port ${port}`);
}));
