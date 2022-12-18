import multer from "multer";
export const imageUpload = multer({ storage: multer.memoryStorage() });
