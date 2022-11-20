import {useRef} from 'react';

// debouncing:
  const Debounce = (fn,delay) =>{
    let timer = useRef();
    return function(...args){
      clearTimeout(timer.current);
      timer.current = setTimeout(()=>{
        fn.apply(this,[...args]);
      },delay);
    }
  }

  export default Debounce;
