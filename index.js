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
    form.elements.word.value = '';
    form.elements.lang.value = 'en_US';
    const sendURL = `${url}${lang}/${word}`;
    ulParent.innerHTML = "";
    const xhr = new XMLHttpRequest();
    xhr.open('GET', sendURL, true);
    
    function cli(word, ele) {
        let li = document.createElement('li');
        if (ele !== undefined) {
            li.innerHTML = `<b>${word}</b> - <span>${ele}</span>`;
        } else {
            li.innerHTML = `<b>${word}</b> - Not Available :(</span>`;
        }
        return li;
    }

    xhr.onload = () =>{
            if(xhr.status >= 200 && xhr.status < 400){
                let res = JSON.parse(xhr.response);
                console.log(res[0].word);
                let ind = Math.floor(Math.random() * res[0].meanings.length);
                p.innerHTML = "";
                const { partOfSpeech, definitions } = res[0].meanings[ind];
                ulParent.append(cli("Word", res[0].word));
                ulParent.appendChild(cli("Part Of Speech", partOfSpeech));
                ulParent.appendChild(cli("Definition", definitions[0].definition));
                ulParent.appendChild(cli("Example", definitions[0].example));

                const [sy1, sy2, sy3] = definitions[0].synonyms;
                let li4 = document.createElement('li');
                if (sy1 !== undefined && sy2 !== undefined && sy3 !== undefined) {
                    li4.innerHTML = `<b>Synonyms</b> - <span>${sy1} , ${sy2} , ${sy3} !</span>`;
                    ulParent.append(li4);
                } else {
                    li4.innerHTML = `<b>Synonyms!</b> - <span>Not Available</span>`;
                    ulParent.append(li4);
                }

            }else{
                console.error("ERROR!", xhr.status); 
                p.innerText = `Error :( Word not found! ${xhr.status}... Try searching a valid word!`;
            }   
    }
    xhr.send();
});
