import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

class FileMiddleware {
  public isFileValid() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.files || !req.files.avatar) {
        return res.status(400).json({ message: "File is required" }); // RETURN прерывает выполнение!
      }

      const avatar = req.files.avatar as UploadedFile;

      // 2. Проверяем тип файла
      if (!avatar.mimetype.startsWith("image/")) {
        return res.status(400).json({ message: "Only images are allowed" }); // Снова RETURN
      }

      next();
    };
  }
}

export const fileMiddleware = new FileMiddleware();
