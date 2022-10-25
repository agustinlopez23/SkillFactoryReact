
export const fromFirebaseToLocal=(news)=>{
    
    
    const n = news.map(({category,datetime,headline,id,image,related,source,summary, url})=>({category,datetime,headline,id,image,related,source,summary, url}))

return n
}
