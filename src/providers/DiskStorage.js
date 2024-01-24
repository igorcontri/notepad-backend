const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");
const { diskStorage } = require("multer");

class DiskStorage {
  async saveFile(file) {
    //"rename" não é renomear arquivo, mas sim trocar o arquivo de diretorio
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;
