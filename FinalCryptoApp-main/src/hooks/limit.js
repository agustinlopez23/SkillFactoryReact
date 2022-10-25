const limitArray = []
export const limitFunction = ({newsFetch, limit})=>{   
    
    newsFetch.data.map((n) => {if (limitArray.length > limit) return;
     limitArray.push(n);
     
   });
   //console.log(limitArray)
 return limitArray
}