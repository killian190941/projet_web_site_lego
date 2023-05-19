
module.exports={
    addVote({ model, params, user }) {
        let myid = model.users.getByLogin(user.login).id;
        model.scores.addScore({user_id:myid, picture_id:params.id, score:params.score});
    },
    checkVote({ model, params, user }) {
        let myid = model.users.getByLogin(user.login).id;
        let count = model.scores.checkScore({user_id:myid, picture_id:params.id}).count;
        let scoreData = model.scores.myScore({ user_id:myid, picture_id: params.id });
        let score = scoreData ? scoreData.score : 0;

return { count: count, score: score };

    },
    totalVote({ model, params }) {
        let score = model.scores.scoreTotal({picture_id: params.id}).scoreTotal;
        if (score === null) {
            score = 0;
        };
        return {score:score.toFixed(2)};
    },
    nbrVotes({ model, params }) {
        let count = model.scores.nbrVotes({picture_id:params.id}).count;
        return {count:count};
    },
    topTenImages({config, model, user }) {    
        let myid = model.users.getByLogin(user.login).id;   
        let topImages = model.getImages.getTopImages();
        // Prepare the data to return
        let data = topImages.map(image => {
            return {
                path: image.path,
                title: image.title,
                description: image.description,
                id: image.id,
                username: image.login,
                owner_id: image.owner_id,
                score: image.score.toFixed(2),
                myid: myid
            };
        });
        return {
            files: data,
            root: config.uploadPrefix
        }
    }
}