// class Count{
//     [Symbol.iterator](){
//         let index=0;
//         return{
//             next:()=>{
//                 return index<5?{done:false,value:index++}:{done:true};
//             }
//         }
//     }
// }
// let c=new Count();
// for(let i of c){
//     console.log(i);
// }
// class Count{
//     [Symbol.iterator](){
//         let i=0;
//         return {
//             next:()=>{
//                 return i<5?{done:false,value:i++}: {done:true}
//             }
//         }
//     }
// }
// let c=new Count()
// for(let i of c){
//     console.log(i)
// }

// const arr = ['a', 'b'];
// const iterator = arr[Symbol.iterator]();
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())

// let obj = { a: 1, b: 2 }
// obj[Symbol.iterator]=function(){
//     let index=0;
//     return {
//         next:()=>{
//             return index<Object.values(obj).length?{done:false,value:Object.values(obj)[index++]}:{done:true,value:undefined}
//         }
//     }
// }
// for(let i of obj){
//     console.log(i)
// }

  
// let obj = { a: 1, b: 2 }
// console.log(Object.keys(obj))
// console.log(Object.values(obj))
// console.log()
class Fibonacc{
    [Symbol.iterator](){
        let [a,b]=[0,1]
        return {
            next(){
                [a,b]=[b,a+b]
                return {done:false,value:a}
            }
        }
    }
}
let f=new Fibonacc()
let index=0;
for(let i of f){
    console.log(i)
    if(index++>=100){
        break;
    }
}