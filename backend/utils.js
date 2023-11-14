const findElementByName = (targetName,newName,namesArr) => {

    //this method uses indexOf method
    const index = namesArr.indexOf(targetName);

    if (index !== -1) {
        namesArr[index] = newName;
    }

    return namesArr;
    
    //method below uses iteration
    // for(let i = 0; i< namesArr.length;i++){
    //     if (namesArr[i]===targetName){
    //         namesArr.splice(i,1,newName);
    //     }
    // }
    // return namesArr;

    
}

const findElementIndex = (name,namesArr) => {

    const index = namesArr.indexOf(name);

    return index;
}

module.exports = {
    findElementByName:findElementByName,
    findElementIndex: findElementIndex
}