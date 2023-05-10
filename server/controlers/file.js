const fs=require("fs");
const path=require("path");

module.exports={
    upload({params, config, model}) {
        for(let i=0; i<params.upload.length; i++) {
            let filename=path.join(config.uploadDirectory,params.upload[i].name);
            fs.writeFileSync(filename,params.upload[i].buffer);
        } // ici multi fichier upload, pas necessaire
    },
    listUploads({config}) {
        let files=fs.readdirSync(config.uploadDirectory);
        return {
            files,
            root:config.uploadPrefix
        }
    },
    latestImages({config, model}) {
        // Query the database to get latest images and user information
        let latestImages = model.latestImages.getLatestImages();
        
        // Prepare the data to return
        let data = latestImages.map(image => {
            return {
                path: image.path,
                title: image.title,
                username: image.login
            };
        });
        
        return {
            files: data,
            root: config.uploadPrefix
        }
    }
}
