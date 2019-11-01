const sortOutput = (a,b) => a > b ? 1 : b > a ? -1 : 0

export const sortArrayBy = (arr,criteria) => {
    return arr.slice().sort((a,b)=>sortOutput(a.criteria,b.criteria))
}