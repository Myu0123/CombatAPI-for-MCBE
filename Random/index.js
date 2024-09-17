class LCGSeed{
  constructor(seed){
    this.max = 2147483647;
    this.period = 16807;
    this.seed = Math.floor(seed) % this.max;
    if(this.seed <= 0) this.seed += this.max-1;
  }
  next(){
    this.seed = (this.seed * this.period) % this.max;
    return (this.seed - 1) / this.max-1;
  }
}

class Weight{
  constructor(choices, weights, times){
    this.c = choices;
    this.w = weights;
    this.t = times;
    this.total = weights.reduce((sum, weight) => sum + weight, 0);
    this.pick();
  }
  pick(){
    let result = [];

    for(let i=0; i<this.t; i++){
      let RDnum = Math.random() * this.total;
      let cmW = 0;

      for(let j=0; j<this.c.length; j++){
        cmW += this.w[j];
        if(RDnum < cmW) result.push(this.c[j]);
      }
    }
    return result;
  }
}
