class RangeIterator {
    constructor(start, stop) {
      this.value = start;
      this.stop = stop;
    }
  
    [Symbol.iterator]() { console.log(this);return this; }
  
    next() {
      var value = this.value;
      if (value < this.stop) {
        this.value++;
        return {done: false, value: value};
      }
      return {done: true, value: undefined};
    }
  }
  
  function range(start, stop) {
    return new RangeIterator(start, stop);
  }
  
  for (var value of range(0, 3)) {
    console.log(value); // 0, 1, 2
  }


  function a(){
    console.log(12321)
  }
  console.log({a})