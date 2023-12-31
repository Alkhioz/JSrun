document.addEventListener("DOMContentLoaded",()=>{
    const exebtn = document.querySelector("#js-run-button");
    const clsbtn = document.querySelector("#js-clean-button");
    const cpbtn = document.querySelector("#js-copy-button");
    console.originalLog = console.log;
    console.log = function() {
      var args = Array.prototype.splice.call(arguments, 0); 
      console.originalLog.apply(this, args);  
      const _console = document.querySelector("#jsrun-console-output");
      const infoToLog = document.createElement("div");
      infoToLog.classList.add("jsrun-log-item");
      infoToLog.appendChild(document.createTextNode('jsrun >   ' + args.map(arg=>typeof arg === "object" ? JSON.stringify(arg) : arg).join(' ')));
      const copylogbuton = document.createElement('button');
      copylogbuton.innerHTML = 'Copy';
      copylogbuton.classList.add('jsrun-log-item-copy-button');
      copylogbuton.addEventListener('click', async()=>{
        await navigator.clipboard.writeText(
          args.map(arg=>typeof arg === "object" ? JSON.stringify(arg) : arg).join(' ')
        );
      });
      infoToLog.appendChild(copylogbuton);
      _console.appendChild(infoToLog);
    };
    exebtn.addEventListener("click", ()=>{
      const code = document.querySelector("#jsrun-editor");
      try{
        const f = new Function(code.value);
        f();
      }catch(e){
        console.log(e, e.stack);
      }
    });
    clsbtn.addEventListener("click", ()=>{
      const _console = document.querySelector("#jsrun-console-output");
      _console.innerHTML = '';
    });
    cpbtn.addEventListener("click", async ()=>{
      const code = document.querySelector("#jsrun-editor");
      await navigator.clipboard.writeText(code.value);
    });
});