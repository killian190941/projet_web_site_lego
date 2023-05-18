const path=require("path");
const fs=require('fs')

module.exports={
    listAbos({config, model, user}) {
        let myid = model.users.getByLogin(user.login).id;
        let aboImages = model.latestImages.getOthersImages(myid);
        for (let i = 0; i < aboImages.length; i++) {
            if (aboImages[i].score === null) {
                aboImages[i].score = "non noté";
            } else {
                aboImages[i].score = aboImages[i].score.toFixed(2)
            }
          };
        // Prepare the data to return
        let data = aboImages.map(image => {
            return {
                path: image.path,
                title: image.title,
                username: image.login,
                description: image.description,
                id: image.id,
                owner_id: image.owner_id,
                myid: myid,
                score: image.score
            };
        });
        return {
            files: data,
            root: config.uploadPrefix
        }
    },
    listCreations({config, model, user}) {
        let myid = model.users.getByLogin(user.login).id;
        let myImages = model.latestImages.getMyImages(myid);
        for (let i = 0; i < myImages.length; i++) {
            if (myImages[i].score === null) {
                myImages[i].score = "non noté";
            } else {
                myImages[i].score = myImages[i].score.toFixed(2)
            }
          };
        // Prepare the data to return
        let data = myImages.map(image => {
            return {
                path: image.path,
                title: image.title,
                description: image.description,
                id: image.id,
                score:image.score
            };
        });
        return {
            files: data,
            root: config.uploadPrefix
        }

    },

    delete({ model, params }) {
        newPath = 'www' +"/" + params.path;
        fs.unlinkSync(newPath);
        return model.items.delete(params.id, 422);
    }, 

modification({ model, params, HTTPError }) {
    let currentItem = model.items.getById(params.id);

    if (params.title == currentItem.title && params.description == currentItem.description) {
        throw new HTTPError("Aucune modification n'a été apportée au titre ou à la description.", 406);
    }

    if (params.title == "") throw new HTTPError("Il faut un titre.", 406);
    if (params.description == "") throw new HTTPError("Il faut une description.", 406);
    if (params.title.includes('"') || params.description.includes('"')) {
        throw new HTTPError("Pas possible de mettre des guillemets dans le titre ou la description.", 406);
    }

    return model.items.updateTitle(params.id,params.title),
    model.items.updateDescription(params.id,params.description);
    }
}
