const path=require("path");

module.exports={
    requireAuth: false,
    latestImagesConnected({config, model, user}) {       
        let myid = model.users.getByLogin(user.login).id;      
        // Query the database to get latest images and user information
        let latestImages = model.getImages.getLatestImages();
        for (let i = 0; i < latestImages.length; i++) {
            if (latestImages[i].score === null) {
              latestImages[i].score = "non noté";
            } else {
              latestImages[i].score = latestImages[i].score.toFixed(2)
            }
          };
        // Prepare the data to return
        let data = latestImages.map(image => {
            return {
                path: image.path,
                title: image.title,
                description: image.description,
                id: image.id,
                username: image.login,
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
    latestImagesNotConnected({config, model}) {           
        // Query the database to get latest images and user information
        let latestImages = model.getImages.getLatestImages();
        for (let i = 0; i < latestImages.length; i++) {
            if (latestImages[i].score === null) {
              latestImages[i].score = "non noté";
            } else {
              latestImages[i].score = latestImages[i].score.toFixed(2)
            }
          };
        // Prepare the data to return
        let data = latestImages.map(image => {
            return {
                path: image.path,
                title: image.title,
                description: image.description,
                id: image.id,
                username: image.login,
                score:image.score
            };
        });
        return {
            files: data,
            root: config.uploadPrefix
        }
    }
}