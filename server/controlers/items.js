const fs = require("fs");
const path = require("path");

module.exports = {
    async add({params, model, HTTPError, user, config}) { /* nom du chemin cree dans publish.js dans la requète url; url:"/items/publish", */
        if (params.title == "") {
            throw new HTTPError("Il faut un titre.", 406); 
        }
        if (params.description == "") {
            throw new HTTPError("Il faut une description.", 406);
        }
        if (params.title.includes('"') || params.title.includes("'") || params.description.includes('"') || params.description.includes("'")) {
            throw new HTTPError("Pas possible de mettre des guillemets simples ou doubles dans le titre ou la description.", 406); 
        }
        if(params.file.length!=1) {
            throw new HTTPError('Veuillez ajouter un fichier.', 444);
        }
        if (!/\.(jpeg|png|jpg)$/i.test(params.file[0].name)) {
            throw new HTTPError("Le format du fichier doit être .jpg, .jpeg ou .png",400);
        }
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
} 