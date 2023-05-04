const fs = require("fs");
const path = require("path");

module.exports = {
    publish({ params, model, HTTPError }) { /* nom du chemin cree dans publish.js dans la requète url; url:"/items/publish", */
        if (params.title == "") throw new HTTPError("il faut un titre", 406);
        if (params.description == "") throw new HTTPError("il faut une description", 406);
        model.items.publish({ title: params.title, description: params.description });
    } //le itemps est le fichier dans le model, le publish la fonction il fait encore pouvoir upload le fichier, celui ci est pris en charge par mispadf
}
/*    upload({params, config}) {
        for(let i=0; i<params.upload.length; i++) {
            let filename=path.join(config.uploadDirectory,params.upload[i].name);
            fs.writeFileSync(filename,params.upload[i].buffer);
        }
    },
    listUploads({config}) {
        let files=fs.readdirSync(config.uploadDirectory);
        return {
            files,
            root:config.uploadPrefix
        }
    }
} */ 