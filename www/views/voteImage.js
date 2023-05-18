mispaf.addPageListener("enter:voteImage", (event) => {
    mispaf.ajax({
        url: "/vote/checkVote",
        type: 'POST',
        data:{id:imageId},
        success(response) {
            score = response.score;
            if (response.count !== 0) {
                document.getElementById('noVote').classList.add("invisible");
                document.getElementById('voteOuPas').innerText="Vous avez donné une note de " + score +"/5 à cette image";
            }
            else {
                document.getElementById('noVote').classList.remove("invisible");
                document.getElementById('voteOuPas').innerText="Quelle note donneriez vous à cette création :";
            }
        },
        error(response) {
            alert(response);
        }
    });
    mispaf.ajax({
        url: "/vote/totalVote",
        type: 'POST',
        data:{id:imageId},
        success(response) {
            score = response.score;
            if (score == 0) {
                document.getElementById('scoreImage').innerText="L'image n'a pas encore reçu de vote. Soyez le premier à la noter!";
            } else if (score <= 2) {
                document.getElementById('scoreImage').innerText="L'image a un score de "+ score +"/5, c'est vraiment pas fou faudrait peut-être supprimer..";
            } else if (score <= 3) {
                document.getElementById('scoreImage').innerText="L'image a un score de "+ score +"/5, c'est pas dingo tout ça.";
            } else if (score <= 4) {
                document.getElementById('scoreImage').innerText="L'image a un score de "+ score +"/5, c'est pas mal du tout!.";
            } else if (score < 5) {
                document.getElementById('scoreImage').innerText="L'image a un score de "+ score +"/5, Wow, on sent le travail derrière cette création.";
            } else if (score == 5) {
                document.getElementById('scoreImage').innerText="L'image a un score de "+ score +"/5, C'est magnifique..une merveille!!!.";
            };
        },
        error(response) {
            alert(response);
        }
    });
    let container = document.querySelector('#voteImage .image-container');
    let image = [];
    image.push(`
<div class="image">
    <img src="${mispaf.escape(imagePath)}" alt="${mispaf.escape(imageTitle)}">
    <h3>${mispaf.escape(imageTitle)}</h3>
    <span>${mispaf.escape(imageDescription)}</span>   
</div>
    `);
    container.innerHTML = image.join('');
})

let resultatVote = null;
document.getElementById("validerScore").addEventListener('click', (event)=>{
    const radioInputs = document.querySelectorAll('.score');
    for (let i = 0; i < 5; i++) {
        const radioInput = radioInputs[i];
        if (radioInput.checked) {
          resultatVote = radioInput.value;
          break;
        }
    }
    function confirmVote() {
        const confirmation = confirm("Le vote est définitif. Etes-vous certain de votre choix?");
        if (confirmation) {
            event.preventDefault(); 
            mispaf.ajax({
                url:"/vote/addVote", 
                type:'POST',
                data:{score:resultatVote,id:imageId},
                success() {
                    alert("Vote effectué");
                    mispaf.page('monProfil');
                },
                error(message) {
                    alert(message);
                }
            });
        } else {
            mispaf.page(mispaf.page());
        }
    }
    confirmVote();
})

document.getElementById("retour").addEventListener('click', (event)=>{
    event.preventDefault(); 
    mispaf.page('monProfil');
})  