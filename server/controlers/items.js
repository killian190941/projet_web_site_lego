const fs = require("fs");
const path = require("path");

module.exports = {
    async add({params, model, HTTPError, user, config}) { /* nom du chemin cree dans publish.js dans la requète url; url:"/items/publish", */
        if (params.title == "") throw new HTTPError("Il faut un titre.", 406);
        if (params.description == "") throw new HTTPError("Il faut une description.", 406);
        if(params.file.length!=1)throw new HTTPError('Veuillez ajouter un fichier.', 444);
        if (!/\.(jpeg|png|jpg)$/i.test(params.file[0].name)) throw new HTTPError("Le format du fichier doit être .jpg, .jpeg ou .png",400);
        let filename=path.join(config.uploadDirectory,params.file[0].name);
        fs.writeFileSync(filename,params.file[0].buffer);
        let myid = model.users.getByLogin(user.login).id;
        model.items.add({
            title: params.title,
            description: params.description,
            path: config.uploadPrefix + '/' + params.file[0].name,
            user_id: myid
        });//up...name ==> nom du file 
    },
    listUploads({config}) {
        let files=fs.readdirSync(config.uploadDirectory);
        return {
            files,
            root:config.uploadPrefix
        }
    }
} //le itemps est le fichier dans le model, le publish la fonction il fait encore pouvoir upload le fichier, celui ci est pris en charge par mispadf
 // a allervoir

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