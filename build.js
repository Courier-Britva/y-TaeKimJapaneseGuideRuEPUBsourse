
const fs = require("fs");
const archiver = require("archiver");

const output = fs.createWriteStream("book.epub");
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", function () {
  console.log(`[✔] EPUB создан: book.epub (${archive.pointer()} байт)`);
});

archive.on("error", function (err) {
  throw err;
});

archive.pipe(output);

archive.append("application/epub+zip", {
  store: true,
  name: "mimetype"
});

archive.directory("META-INF/", "META-INF");
archive.directory("OEBPS/", "OEBPS");

archive.finalize();
