const path = require("path");

module.exports={
    requireAuth: false,
    otherUserProfile({model, config, params, user}) {
        let myid = model.users.getByLogin(user.login).id; 
        let otherUsername = params.username; // Get the username from the AJAX request
        let otherUserImages = model.otherUser.otherUserImagesConnected(otherUsername);
        for (let i = 0; i < otherUserImages.length; i++) {
           
            if (otherUserImages[i].score === null) {
                otherUserImages[i].score = "non noté";
            } else {
                otherUserImages[i].score = otherUserImages[i].score.toFixed(2)
            }
          };
        // Prepare the data to return
        let data = otherUserImages.map(image => {
            return {
                path: image.path,
                title: image.title,
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
    otherUserProfileNotConnected({model, config, params}) {
        let otherUsername = params.username; // Get the username from the AJAX request
        let otherUserImages = model.otherUser.otherUserImages(otherUsername);

        // Prepare the data to return
        let data = otherUserImages.map(image => {
            return {
                path: image.path,
                title: image.title,
                description: image.description,
                id: image.id,
                username: image.login,
            };
        });
        return {
            files: data,
            root: config.uploadPrefix
        }
    }
}