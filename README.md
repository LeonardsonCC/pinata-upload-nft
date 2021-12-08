# Piñata Upload of NFTs

## Just a simple script to upload the images and metadata of a NFT Collection using Piñata.

## Preparing
First you need to create your images and metadata, using something like HashLips generative art. Then:
- Copy and paste all the images to the folder in project (default is `munk_images`)
- Copy and paste all the json metadata to the folder in project (default is `munk_metadata`)
- Install dependencies `npm install`

## Uploading...
First you need the API Keys to make the script works: 

- Go to Piñata's dashboard and create a key;
- Create a file in the project just by copying and paste the `.env.sample` as `.env`;
- Fill the `PINATA_PUBLIC_KEY` and `PINATA_SECRET_KEY` with the credentials;
- Run the script by running `node index.js`;

Doing this, all the images will be uploaded to IPFS and the metadata will be updated with the URL
of the image, then the metadata folder is uploaded to IPFS too (IPFS using Piñata)

## Thank you, if you are using this
Feel free to contribute with this project!