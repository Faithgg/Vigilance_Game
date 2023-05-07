let main = document.querySelector('div.main')
let lesMargesLarges = [1,3,1.25,2.5,4,1,3,5,2,3.5,1.25,5,1,3.5]
let durreeDeJeu = 50
let max=0
let Duree = document.querySelector('.compteur p')
let Score = document.querySelector('.score p')
let meilleurScore = document.querySelector('.meilleur_score p')
let scoreCourant = 0
let jeuEnCours = 0
let durreeRestante = durreeDeJeu

Duree.innerHTML = "<p>Durée: "+(durreeDeJeu)+ " u.t</p>"

    function jeu() 
{
    meilleurScore.innerHTML = "<p>Hight: "+(localStorage.getItem('meilleur_score'))+ "</p>"
    let random = Math.random()
    let raison = (random*100)+(random**random)*20
    let hauteurCouranteDesLignes=0

    for (let indexLigne = 1; indexLigne < 15; indexLigne++) {
        if (hauteurCouranteDesLignes <=75)
        {
            let largeurBubble= 0
            let hauteurBubble= 0

        if ((indexLigne%2==0))
        {
            if (indexLigne <= 7)
            {largeurBubble= (indexLigne+15+(Math.random()*15))/3
            hauteurBubble= (indexLigne+10+(Math.random()*10))/3} else {
            largeurBubble= (indexLigne+2+(Math.random()*2))/2
            hauteurBubble= (indexLigne+4+(Math.random()*3))/3
            }
        } else {
            if (indexLigne <= 7)
            {
            largeurBubble = (indexLigne+9+(Math.random()*15))/3
            hauteurBubble = (indexLigne+5+(Math.random()*15))/3} else {
            largeurBubble = (indexLigne+5+(Math.random()*1))/3
            hauteurBubble = (indexLigne+7+(Math.random()*3))/3
            }
        }
        let nombreMaxBubble = 96 / (largeurBubble + (lesMargesLarges[indexLigne-1]*2))
        let ligne = document.querySelector(`.ligne${indexLigne}`)
        for (let indexBubble = 1; indexBubble <= nombreMaxBubble; indexBubble++) {
            let bubblee = document.createElement('div')
            bubblee.setAttribute('class','bubble')
            bubblee.setAttribute('style',`background:rgb(${Math.random()*200},${Math.random()*150},${Math.random()*250});width:${largeurBubble}vw;border-radius:${largeurBubble/2}vw;height:${hauteurBubble}vh`)
            let number = document.createElement('div')
            number.innerText= parseInt(Math.random()*raison +10/random)
            if (hauteurBubble >= 3.5)
             {number.setAttribute('style',`margin:${hauteurBubble/3}vh auto;`)}

            bubblee.append(number)
            ligne.appendChild(bubblee) 
            }
            hauteurCouranteDesLignes=hauteurCouranteDesLignes+hauteurBubble+4
        }
    }
}

async function boucle ()
{   
   if (jeuEnCours == 0)
    {
        let melody = document.createElement('div')
        melody.innerHTML = '<audio src="./medias/song.mp3" autoplay></audio>'
        document.querySelector('.main').append(melody)
    jeu()
    trieurDeResultat()
    durreeRestante = durreeDeJeu
}
    while (durreeRestante > 0)
    {   
        if (jeuEnCours==0)
       {
        await new Promise (attente => setTimeout(attente,1000))
        durreeRestante = durreeRestante - 1
        Duree.innerHTML = "<p>Durée: "+(durreeRestante)+ " u.t</p>"}
    else {
       return
    }
    }
    let melodieEchec = new Audio("./medias/echoue.mp3")
    melodieEchec.play()
    let failed = document.createElement('div')
    failed.setAttribute('class',"container")
    document.querySelector('.conteneur').replaceWith(failed)
}

async function trieurDeResultat() {
    max=0
    let bubbles = document.querySelectorAll('.bubble')
    bubbles.forEach(bubble => {
        let nombreCourant = parseInt(bubble.textContent)
       if (max<nombreCourant) {
        max = nombreCourant
       }
    });
}

function interractionJeu() {  
    jeuEnCours = 0
    boucle()
}

function nettoyeur() {
    for (let indexLigne = 1; indexLigne < 15; indexLigne++) { 
        let ligne = document.querySelector(`.ligne${indexLigne}`)
        ligne.replaceChildren("")}
}

interractionJeu()

onclick = (element)=>{
    let numeroBubbleCliquee =element.srcElement.firstChild.textContent
    if (numeroBubbleCliquee != max) {
        let melodieEchec = new Audio("./medias/echoue.mp3")
            melodieEchec.play()
} else {
        let melodieEchec = new Audio("./medias/gagne.mp3")
        melodieEchec.play()
        scoreCourant = scoreCourant + 5
        if (localStorage.getItem('meilleur_score')==null ) 
            {
                localStorage.setItem('meilleur_score',scoreCourant)
            } else {
                if ( scoreCourant > localStorage.getItem('meilleur_score')) {
                    localStorage.setItem('meilleur_score',scoreCourant)
                }
            }

            let music =  document.querySelector('audio')

            music.remove()
        Score.innerHTML = "<p>Score: "+(scoreCourant)+ "</p>"
        durreeDeJeu = Math.round( durreeDeJeu*(1+ scoreCourant/5)/(scoreCourant/5) )
        if (durreeDeJeu > 500) { durreeDeJeu=500}
        jeuEnCours = 1
        nettoyeur()
        return interractionJeu()
    }
}
