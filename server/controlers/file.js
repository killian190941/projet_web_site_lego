const fs=require("fs");
const path=require("path");

module.exports={
    upload({params, config}) {
        for(let i=0; i<params.upload.length; i++) {
            let filename=path.join(config.uploadDirectory,params.upload[i].name);
            fs.writeFileSync(filename,params.upload[i].buffer);
        } // ici multi fichier uplaod, pas necessaire
    },
    listUploads({config}) {
        let files=fs.readdirSync(config.uploadDirectory);
        return {
            files,
            root:config.uploadPrefix
        }
    },
}