const fs = require("fs");
const path = require("path");

module.exports = {
    add({ params, model, HTTPError, user, config }) { /* nom du chemin cree dans publish.js dans la requète url; url:"/items/publish", */
        if (params.title == "") throw new HTTPError("il faut un titre", 406);
        if (params.description == "") throw new HTTPError("il faut une description", 406);
        if(params.file.length!=1)throw new HTTPError('un seul fichier stp', 444)
        let filename=path.join(config.uploadDirectory,params.file[0].name);
        fs.writeFileSync(filename,params.file[0].buffer);
        let myid = model.users.getByLogin(user.login).id;
        model.items.add(params.title, params.description,config.uploadPrefix+'/'+params.upload[0].name, myid); //up...name ==> nom du file 
    } //le itemps est le fichier dans le model, le publish la fonction il fait encore pouvoir upload le fichier, celui ci est pris en charge par mispadf
} // a allervoir
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