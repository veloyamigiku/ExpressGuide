import express from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { Response } from 'express';

const app = express();
const port = 3000;


app.use(express.json());

const prisma = new PrismaClient();

app.get('/', (req: Request, res: Response) => res.send('Hello World!'));

app.get('/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      Posts: true
    }
  });
  return res.json(users);
});

app.post('/users', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email
      }
    });
    return res.json(user);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.log('There is a unique constraint violation, a new user cannot be created with this email');
      }
    }
    return res.status(400).json(e);
  }
});

app.put('/users/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  try {
    const user = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        name: name
      }
    });
    return res.json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.delete('/users/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const user = await prisma.user.delete({
      where: {
        id: id
      }
    });
    return res.json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.get('/users/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: id
      }
    });
    return res.json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.post('/posts', async (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: authorId
      }
    });
    return res.json(post);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.listen(
  port,
  () => {
    console.log(`Example app listening on port ${port}`);
  }
);
