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
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const prisma = new client_1.PrismaClient();
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany({
        include: {
            Posts: true
        }
    });
    return res.json(users);
}));
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const user = yield prisma.user.create({
            data: {
                name: name,
                email: email
            }
        });
        return res.json(user);
    }
    catch (e) {
        if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                console.log('There is a unique constraint violation, a new user cannot be created with this email');
            }
        }
        return res.status(400).json(e);
    }
}));
app.put('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { name } = req.body;
    try {
        const user = yield prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: name
            }
        });
        return res.json(user);
    }
    catch (e) {
        return res.status(400).json(e);
    }
}));
app.delete('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const user = yield prisma.user.delete({
            where: {
                id: id
            }
        });
        return res.json(user);
    }
    catch (e) {
        return res.status(400).json(e);
    }
}));
app.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const user = yield prisma.user.findUniqueOrThrow({
            where: {
                id: id
            }
        });
        return res.json(user);
    }
    catch (e) {
        return res.status(400).json(e);
    }
}));
app.post('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, authorId } = req.body;
    try {
        const post = yield prisma.post.create({
            data: {
                title: title,
                content: content,
                authorId: authorId
            }
        });
        return res.json(post);
    }
    catch (e) {
        return res.status(400).json(e);
    }
}));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=main.js.map