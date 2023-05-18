const path=require("path");
const fs=require('fs')

module.exports={
    listAbos({config, model, user}) {
        let myid = model.users.getByLogin(user.login).id;
        let myImages = model.latestImages.getOthersImages(myid);
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

    modification({ model, params}) {
        return model.items.updateTitle(params.id,params.title),
        model.items.updateDescription(params.id,params.description);
    }
}
