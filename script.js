//getting html elements
let inputA = document.getElementById("inputA");
let inputB = document.getElementById("inputB");
let inputResBasic = document.getElementById("inputResBasic");
let operationSelectBasic = document.getElementById("operationBasic");
let submitBasic = document.getElementById("submitBasic");
let inputsBasic = document.querySelectorAll('#basicSets .input-area input');

let inputResAi = document.getElementById("inputResAi");
let operationSelectAi = document.getElementById("operationAi");
let submitAi = document.getElementById("submitAi");
let inputsAi = document.querySelectorAll('#universalSets .ai input');
console.log(inputsAi);


//variables for basic operations (first block)
let A =[]
let B = [];
//getting id of default operation
let selectedBasicId = getSelectChoice(operationSelectBasic);
//console.log(selectedBasicId);


let Ai=[[], [], []]
let selectedAiId = getSelectChoice(operationSelectAi);
console.log(selectedAiId);



operationSelectAi.addEventListener('change', (e)=>{
    //getting id of operation when user changes it
    selectedAiId = getSelectChoice(e.target);
    console.log(selectedAiId)
})

operationSelectBasic.addEventListener('change', (e)=>{
    //getting id of operation when user changes it
    selectedBasicId = getSelectChoice(e.target);
    console.log(selectedBasicId)
})

//gets id of selected option from select html element
function getSelectChoice(select){
    let options = select.options;
    let selIndex = options.selectedIndex;
    let selectedOption = options[selIndex].id;
    //console.log(selectedOption);
    return selectedOption;
}

inputA.addEventListener('input', (e)=>{
    A=getInputValues(e);
    //console.log('A=',A);
    deletRepeatingElements(A);
    A.sort((a,b)=>{return a-b})
    //console.log('After deliting and sorting A=',A);
})
inputB.addEventListener('input', (e)=>{
    B=getInputValues(e);
    //console.log('B=',B);
    deletRepeatingElements(B);
    B.sort((a,b)=>{return a-b})
    //console.log('After deliting and sorting B=',B);
})
inputsAi.forEach((inputAi, i)=>{
    inputAi.addEventListener('input', (e)=>{
        Ai[i]=getInputValues(e);
        //console.log('A=',A);
        deletRepeatingElements(Ai[i]);
        Ai[i].sort((a,b)=>{return a-b})
        console.log('After deliting and sorting A'+i+'=',Ai[i]);
        console.log('After deliting and sorting Ai',Ai);
    })
})


function contains(arr, item) {
    let i = arr.indexOf(item);
    console.log('arr', arr, 'el',item,'i', i)
    if (i>-1) return true
    else return false;
}
function getInputValues(e) {
    let curVal = e.target.value;
    let arr = stringToArr(curVal);
    //console.log(curVal, arr);
    return arr;
}
function deletRepeatingElements(arr) {
    arr.forEach((curEl, i)=> {
        arr.forEach((el, j)=>{
            if ((el===curEl) && (i!==j)) {
                console.log('in arr', arr,'there already is el',curEl,'its on place',j)
                arr.splice(j, 1);
                j--;
                curEl = arr[i];
            }
        })
    })
    
}


function stringToArr(str) {
    let arr = str.split(' ');
    console.log('splited',arr);
    arr.forEach((item, i)=>{
        if ((item!=0) || (item==='0')) {
            arr[i]= item;
        } else if ((i!=0) && ((item==0) || (item===''))) {
            arr[i]= `∅`;
        } else {
            arr.splice(i, 1);
            i--;
            item = arr[i]
        }
        
    });

    return arr;
}


function union(A, B) {
    let res = [].concat(A, B);
    return prettifyResult(res);
}
function intersection(A, B) {
    let res = [];
    B.forEach(b=>{
        A.forEach(a=>{
            if (b==a) {
                res.push(b)
            }
        })
    });
    return prettifyResult(res);
}
function difference(A, B) {
    let res = [];
    let mutual = intersection(A, B);
    A.forEach(a=>{
        if(!contains(mutual, a)){
            res.push(a)
        }
    })
    return prettifyResult(res);
}
function symmetricDifference(A, B) {
    res = difference(union(A, B), intersection(A, B));
    return prettifyResult(res);
}
function universalUnion(Ai) {
    let res =[];
    Ai.forEach(A=>{
        A.forEach(a=>{
            res.push(a)
        })
    })
    return prettifyResult(res);
}
function universalIntersection(Ai) {
    let res = Ai[0];
    for (var i=1; i<Ai.length; i++) {
        res = intersection(res, Ai[i]);
    }
    return prettifyResult(res);
}
function calculate(A, B, opId) {
    let res =[];
    //console.log(A, B, opId)
    if (opId=='un') {
        res = union(A, B);
    } else if (opId=='inter') {
        res = intersection(A, B);
    } else if (opId=='diff') {
        res = difference(A, B);
    } else if (opId=='symdiff') {
        res = symmetricDifference(A, B);
    } else if (opId=='unAi') {
        res = universalUnion(Ai);
    } else if (opId=='interAi') {
        res = universalIntersection(Ai);
    }
     
    return res;
}
function appendResult(e, op, input) {
    e.preventDefault();
    let res = calculate(A, B, op);
    //console.log(res)
    //console.log('i did it')
    input.innerHTML = `{${res}}`;
}

function prettifyResult(res) {
    deletRepeatingElements(res);
    res.sort((n,m)=>{return n-m})
    return res
}
submitBasic.addEventListener('click', (e)=>{appendResult(e, selectedBasicId, inputResBasic)});
submitAi.addEventListener('click', (e)=>{appendResult(e, selectedAiId, inputResAi)});