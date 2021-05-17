const url = "https://api.dictionaryapi.dev/api/v2/entries/";
{/* <language_code>/<word> */}

const display = document.querySelector('#display');
const form = document.querySelector('#form');
let ulParent = document.querySelector('#lists');
const p = document.querySelector('#error');

form.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    const lang = form.elements.lang.value;
    const word = form.elements.word.value;
    const sendURL = `${url}${lang}/${word}`;
    ulParent.innerHTML = "";
    const xhr = new XMLHttpRequest();
    xhr.open('GET', sendURL, true);

    xhr.onload = () =>{
            if(xhr.status >= 200 && xhr.status < 400){
                let res = JSON.parse(xhr.response);
                console.log(res[0].word);
                let ind = Math.floor(Math.random() * res[0].meanings.length);
                p.innerHTML = "";
                const {partOfSpeech, definitions} = res[0].meanings[ind];

                let li = document.createElement('li');
                li.innerHTML = `<b>Part of Speech </b> - <span>${partOfSpeech}</span>`;
                ulParent.appendChild(li);
                let count=0;
                definitions.forEach(ele =>{
                    count++;
                    let li1 = document.createElement('li'); 
                    li1.innerHTML = `<b>Definition</b>(${count}) - <span>${ele.definition}</span>`;
                   
                    let li2 = document.createElement('li');
                    if(ele.example !== undefined){
                        li2.innerHTML = `<b>Example</b>(${count}) - <span>${ele.example}</span>`;
                    }else{
                        li2.innerHTML = `<b>Example</b>(${count}) - <span>Not Available :(</span>`;
                    }
                    
                   
                    ulParent.appendChild(li1);
                    ulParent.appendChild(li2);
                })  
            }else{
                console.error("ERROR!", xhr.status); 
                p.innerText = `Error :( Word not found! ${xhr.status}... Try searching a valid word!`;
            }   
    }
    xhr.send();
});













  //Mehnat
  // meaning.forEach(ele => {
                //     console.log(`Part of Speech - ${ele.partOfSpeech}`);
                //     const definitions = ele.definitions;
                //     definitions.forEach(def =>{
                //         console.log(`Definition - ${def.definition}`);
                //         //console.log(def.synonyms);
                //         console.log(`Example - ${def.example}`);
                //     })
                // });

                 //console.log(`Definition - ${ele.definition}`);
                    //console.log(`Example - ${ele.example}`);
                      //console.log(`Part of Speech - ${partOfSpeech}`);