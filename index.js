const path = require("path");
const { readFile, writeFile } = require("fs");
const recursive = require("recursive-fs");

const dotenv = require("dotenv");
const pinataSDK = require("@pinata/sdk");

dotenv.config();

const imageDir = process.env.IMAGE_FOLDER;
const metadataDir = process.env.METADATA_FOLDER;
const publicKey = process.env.PINATA_PUBLIC_KEY;
const privateKey = process.env.PINATA_PRIVATE_KEY;

const pinata = pinataSDK(publicKey, privateKey);

const start = async () => {
  try {
    await pinata.testAuthentication();
  } catch (err) {
    console.log("User not authenticated");
    process.exit();
  }

  recursive.readdirr(imageDir, async function (err, dirs, files) {
    for (let file of files) {
      if (!file.endsWith(".png")) continue;

      try {
        const result = await pinata.pinFromFS(file);

        const id = file.replace(/\D+/g, "");
        metadataFile = path.join(__dirname, metadataDir, id + ".json");

        readFile(metadataFile, "utf8", (err, data) => {
          if (err) {
            console.log(`File [${file}] failed read metadata`);
            return;
          }
          const metadata = JSON.parse(data);
          metadata.image = `ipfs://${result.IpfsHash}`;
          writeFile(
            metadataFile,
            JSON.stringify(metadata, null, 2),
            function (err) {
              if (err) {
                console.log(`File [${file}] failed write metadata`);
                return;
              }
              console.log(`Finished [${id}]!`);
            }
          );
        });
      } catch (err) {
        console.log(`File [${file}] failed`);
      }
    }
  });
};

start();
