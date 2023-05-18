
module.exports={
     subscribe({ model, params, user, HTTPError }) {
        let myid = model.users.getByLogin(user.login).id;
        let otherid = model.users.getByLogin(params.username).id;
        if (otherid == myid) {
            throw new HTTPError("Vous ne pouvez pas vous abonner à votre profil.");
        }
        const subscriptionCount = model.subscriptions.checksubscribe({ from_id: myid, to_id: otherid }).count;
        if (subscriptionCount > 0) {
        throw new HTTPError("Vous êtes déjà abonné à ce profil.");
        }
        model.subscriptions.subscribe({from_id:myid, to_id:otherid});
     },
     unsubscribe({ model, params, user, HTTPError}) {
        let myid = model.users.getByLogin(user.login).id;
        let otherid = model.users.getByLogin(params.username).id;
        if (otherid == myid) {
            throw new HTTPError("Vous ne pouvez pas vous désabonner de votre profil.");
        }
        const subscriptionCount = model.subscriptions.checksubscribe({ from_id: myid, to_id: otherid }).count;
        if (subscriptionCount == 0) {
            throw new HTTPError("Vous ne pouvez pas vous désabonner d'un compte que vous ne suivez pas.");
          }    
        model.subscriptions.unsubscribe({from_id:myid, to_id:otherid});
     }
}