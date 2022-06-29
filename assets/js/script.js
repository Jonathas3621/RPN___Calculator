'use strict';

const current = document.querySelector('#number');
const pointer = document.querySelector(".pointer");
const pointerStyle = document.styleSheets[2].cssRules[0].style;
const keyList = document.querySelectorAll('.key');

const pileContainer = document.querySelector('.pile');
let pileItemsContent = document.querySelectorAll('.content');

let pileTagList = [];


const calculator = {
    //LISTS
    current: [],
    pile: [],

    //MESSAGE
    message: "Home",

    //PROPERTIES
    currentMode: false,

    //TIMER
    timer: undefined,
    timerState: false,

    currentModeChangerTrue(){
        this.currentMode = true;
        this.pointerTimer();
    },
    currentModeChangerfalse(){
        this.currentMode = false;
        this.pointerTimer();
    },

    //KEYS
    '0': function (){
        this.current.push(0);
        this.currentModeChangerTrue();
    },
    '1': function (){
        this.current.push(1)
        this.currentModeChangerTrue();},
    '2': function (){
        this.current.push(2)
        this.currentModeChangerTrue();},
    '3': function (){
        this.current.push(3)
        this.currentModeChangerTrue();},
    '4': function (){
        this.current.push(4)
        this.currentModeChangerTrue();},
    '5': function (){
        this.current.push(5)
        this.currentModeChangerTrue();},
    '6': function (){
        this.current.push(6)
        this.currentModeChangerTrue();},
    '7': function (){
        this.current.push(7)
        this.currentModeChangerTrue();},
    '8': function (){
        this.current.push(8)
        this.currentModeChangerTrue();},
    '9': function (){
        this.current.push(9)
        this.currentModeChangerTrue();},

    //Operators
    operatorsFunction: function(term){
        if(isNaN(term)){
            console.log('error');
        }else{
            this.operation(term);
        }
        this.currentClear();
        this.currentModeChangerfalse();
        updateHtmlPile();
        updatePileItemsContent();
    },
    '/': function (){
        if(this.currentMode == true){
            this.pileAdder();
        }
        this.operatorsFunction(
            this.pile[this.pile.length - 2] / 
            this.pile[this.pile.length - 1]
        );
    },
    '*': function (){
        if(this.currentMode == true){
            this.pileAdder();
        }
        this.operatorsFunction(
            this.pile[this.pile.length - 2] * 
            this.pile[this.pile.length - 1]
        );
    },
    '+': function (){
        if(this.currentMode == true){
            this.pileAdder();
        }
        this.operatorsFunction(
            this.pile[this.pile.length - 2] + 
            this.pile[this.pile.length - 1]
        );
    },
    '-': function (){
        if(this.currentMode == true){
            this.pileAdder();
        }
        this.operatorsFunction(
            this.pile[this.pile.length - 2] - 
            this.pile[this.pile.length - 1]
        );
    },


    //ACTIONS
    'Enter': function (){
        this.pileAdder();
        this.currentClear();
        this.currentModeChangerfalse();
        updateHtmlPile();
        updatePileItemsContent();
    },
    'Backspace': function (){
        if(this.currentMode == true){
            this.current.pop()
            if(this.current.length == 0){
                this.currentModeChangerfalse();
            }
        }else{
            this.pile.pop();
        }
        updateHtmlPile();
        updatePileItemsContent();
    },

    //INTERN MANAGING
    currentAssembling: function (){
        return parseFloat(this.current.join(''));
    },

    //managing
    currentLastDeleter: function (){
        this.current.pop();
    },
    currentClear: function (){
        for(let c = this.current.length; c > 0; c--){
            this.current.pop();
        }
    },
    pileDeleter: function (){
        this.pile.pop();
    },
    pileAdder: function (){
        if(this.current.length > 0 && !isNaN(this.currentAssembling())){
            this.pile.push(this.currentAssembling());
        }
    },
    operation: function (resul){
        for (let c = 2; c > 0; c--){
            this.pile.pop()
        }
        this.pile.push(resul);
    },

    //DISPLAY FUNCTIONS

    generalDisplayActivator: function (){
        this.showCurrent();
    },

    //Show display
    showCurrent: function (){
        if(this.currentMode == true && !isNaN(this.currentAssembling())){
            current.innerHTML = this.currentAssembling();
        }
        else{
            current.innerHTML = '';
        }
    },

    //Show pile

    showPile: function (){

    },

    //Pointer
    pointerToggle (){
        if(pointerStyle.getPropertyValue("visibility") == "visible"){
            pointerStyle.setProperty("visibility", "hidden");
        }else if(pointerStyle.getPropertyValue("visibility") == "hidden"){
            pointerStyle.setProperty("visibility", "visible");
        }

    },
    pointerTimer (){
        if(this.currentMode == true){
            if(this.timerState == false){
                this.timer = setInterval(this.pointerToggle, 500);
                this.timerState = true;
            }
        }else{
            clearInterval(this.timer);
            this.timerState = false;
        }
    }
};

//MANAGING PILE
function updatePileItemsContent (){
    pileItemsContent = document.querySelectorAll('.content');

    if(calculator.pile.length - 1 >= 1){
        for(let j = calculator.pile.length - 1; j >= 0 ; j--){
           pileItemsContent[j].innerHTML = calculator.pile[j];
        };
    }else if(calculator.pile.length - 1 == 0){
        pileItemsContent[1].innerHTML = calculator.pile[0];
        pileItemsContent[0].innerHTML = '';
    }
    else{
        for(let h = 0; h < 2; h++){
            pileItemsContent[h].innerHTML = '';
        }
    }
}

function updateHtmlPile (){
    pileTagList = [];
    for(let i = 1; i <= calculator.pile.length; i++){
            pileTagList.push(
                `<div class="display-bar pile-item">${i} : 
                    <span class="content" id="${i}"></span>
                </div>`
            );
    }
    
    if(pileTagList.length >= 2){
        pileContainer.innerHTML = '';
        for(let c of pileTagList.reverse()){
            pileContainer.innerHTML += c;
        };
    }
    else{
        
    }
};

function keyListener(key){
    if(calculator[key]){ 
        calculator[key]();
    }
    calculator.generalDisplayActivator();
}
window.onkeydown = (e) => {
    keyListener(e.key);
}

keyList.forEach(function (e){
    e.onclick = (evn) => {
        keyListener(evn.target.getAttribute('value'));
    }
});
