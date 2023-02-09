export const handleDuplicates = (arr: string[]): string[] => {
    interface mapType {
      [key:string]: number;
    }

    const freqMap: mapType = {};

    arr.forEach((item) => {
      if (item == '') return;
      const [count, ...rest] = item.split(' ');
      const itemDesc = rest.join(' ');
      const numCount = Number(count);
      if (numCount < 1) return;

      if (itemDesc in freqMap) {
        freqMap[itemDesc] += numCount;
      } else {
        freqMap[itemDesc] = numCount;
      }
    })
    
    const arrWithCount = Object.keys(freqMap).map((item)=>{
      return `${freqMap[item]} ${item}`
    })

    return arrWithCount;
  }

  export const placeholder = `Enter your items here as a list...
  Example:
  1 Book at 12.49
  1 Book at 12.49
  1 Music CD at 14.99
  1 Chocolate bar at 0.85`;