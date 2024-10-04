export const Search = {
    binary(total, value){
        let low = 0;
        let high = total.length - 1;
    
        while(low <= high){
            let mid = Math.floor((low + high) / 2);

            if(value < total[mid]) high = mid - 1;
            else if(value > total[mid]) low = mid + 1;
            else return mid; 
        }
        
        return low;
    },
    
    /**
     * 使用二分搜尋法從累積權重陣列中查找對應的範圍。
     * @param {number[]} total - 累積權重陣列。
     * @param {number} input - 隨機數 (0-1)。
     * @returns {number} - 選擇的對應索引。
     */
    binaryW(total, input){
        let low = 0;
        let high = total.length - 1;

        let value = input * total[high];
    
        while(low <= high){
            let mid = Math.floor((low + high) / 2);

            if(value < total[mid]) high = mid - 1;
            else if(value > total[mid]) low = mid + 1;
            else return mid; 
        }
        
        return low;
    }
}