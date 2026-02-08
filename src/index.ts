// app.use("/users", userRouter);
// app.put(
//   "/users/:userId",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = Number(req.params.userId);
//       const { name, email, password } = req.body;
//
//       if (!name || name.length < 3) {
//         throw new ApiError(
//           "Name is required and should be at least 3 characters long",
//           400,
//         );
//       }
//       if (!email || !email.includes("@")) {
//         throw new ApiError("Email is required and should be valid", 400);
//       }
//       if (!password || password.length < 6) {
//         throw new ApiError(
//           "Password is required and should be at least 6 characters long",
//           400,
//         );
//       }
//       const users = await read();
//
//       const userIndex = users.findIndex((user) => user.id === userId);
//       if (userIndex === -1) {
//         throw new ApiError("User not found", 404);
//       }
//
//       users[userIndex].name = name;
//       users[userIndex].email = email;
//       users[userIndex].password = password;
//
//       await write(users);
//       res.status(201).send(users[userIndex]);
//     } catch (e) {
//       next(e);
//     }
//   },
// );
//
// app.delete(
//   "/users/:userId",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = Number(req.params.userId);
//       const users = await read();
//
//       const userIndex = users.findIndex((user) => user.id === userId);
//       if (userIndex === -1) {
//         throw new ApiError("User not found", 404);
//       }
//       users.splice(userIndex, 1);
//
//       await write(users);
//       res.sendStatus(204);
//     } catch (e) {
//       next(e);
//     }
//   },
// );

// app.use(
//     "*",
//     (error: ApiError, req: Request, res: Response, next: NextFunction) => {
//         res.status(error.status || 500).send(error.message);
//     },
// );
//
// process.on("uncaughtException", (error) => {
//     console.error("uncaughtException", error.message, error.stack);
//     process.exit(1);
// });

import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "./errors/api-error";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

// // показати всіх юзерів
// app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const users = await reader();
//     res.send(users);
//   } catch (e: any) {
//     next(e);
//   }
// });

// // показати юзера по id
// app.get(
//   "/users/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const users = await reader();
//       const id = Number(req.params.id);
//
//       const user = users.find((u: any) => u.id === id);
//
//       if (!user) {
//         throw new ApiError("User not found", 404);
//       }
//
//       res.send(user);
//     } catch (e: any) {
//       next(e);
//     }
//   },
// );

// // створити юзера
//
// app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { name, email, password } = req.body;
//
//     if (!name || name.length < 3) {
//       throw new ApiError(
//         "Name is required and should be at least 3 characters long",
//         400,
//       );
//     }
//
//     if (!email || !email.includes("@")) {
//       throw new ApiError("Email is required and should be valid", 400);
//     }
//
//     if (!password || password.length < 6) {
//       throw new ApiError(
//         "Password is required and should be at least 6 characters long",
//         400,
//       );
//     }
//
//     const users = await reader();
//
//     const id = users.length ? users[users.length - 1].id + 1 : 1;
//
//     const newUser = { id, name, email, password };
//
//     users.push(newUser);
//     await write(users);
//
//     res.status(201).send(newUser);
//   } catch (e) {
//     next(e);
//   }
// });
//
// // змінити юзера
//
// app.put(
//   "/users/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const users = await reader();
//       const id = Number(req.params.id);
//
//       const index = users.findIndex((u: any) => u.id === id);
//
//       if (index === -1) {
//         throw new ApiError("User not found", 404);
//       }
//
//       const { name, email, password } = req.body;
//
//       users[index] = { ...users[index], name, email, password };
//
//       await write(users);
//
//       res.send(users[index]);
//     } catch (e: any) {
//       next(e);
//     }
//   },
// );
//
// // видалити юзера
//
// app.delete(
//   "/users/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const users = await reader();
//       const id = Number(req.params.id);
//
//       const filteredUsers = users.filter((u: any) => u.id !== id);
//
//       if (filteredUsers.length === users.length) {
//         throw new ApiError("User not found", 404);
//       }
//
//       await write(filteredUsers);
//
//       res.send("User deleted");
//     } catch (e: any) {
//       next(e);
//     }
//   },
// );

process.on("uncaughtException", (err: Error) => {
  console.error("uncaughtException", err.message, err.stack);
  process.exit(1);
});

app.use(
  "*",
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).send(error.message);
  },
);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
