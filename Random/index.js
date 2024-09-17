/*try{
  return operation();
}
catch(error){
  return NaN;
}*/
class LCG_SeededRNG{
  constructor(seed){ //seed不可為0
    this.max = 2147483647;
    this.period = 16807;

    if(typeof seed === 'number' && isFinite(seed)){
      this.seed = Math.floor(seed) % this.max;
      while(this.seed <= 0) this.seed += this.max-1; //[1, max)
    }
    else{
      this.seed = Math.floor(Math.random() * this.max)
    }
    this.RN = (this.seed-1) / (this.max-1);
  }
  next(){
    this.seed = (this.seed * this.period) % this.max;
    this.RN = (this.seed-1) / (this.max-1);
  }
}

class Weight{
  constructor(choices, weights, times){
    this.c = choices;
    this.w = weights;
    this.t = times;
    this.total = weights.reduce((sum, weight) => sum + weight, 0);
  }
  generate(){
    let result = [];

    for(let i=0; i<this.t; i++){
      let RN = Math.random() * this.total;
      let cmW = 0;

      for(let j=0; j<this.c.length; j++){
        cmW += this.w[j];
        if(RN < cmW) result.push(this.c[j]);
      }
    }
    return result;
  }
}

class Rarity{
  constructor(maximum){
    this.m = maximum;
  }
  generate(){
    let RN = Math.random() * this.m;

    if(RN === 0) return Infinity;
    else return 1 / RN;
  }
}