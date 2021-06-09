
const encrypt = (data) => {

   return `${Math.random().toString(20).substr(2, 6)}${window.btoa(data)}${Math.random().toString(20).substr(2, 6)}`;
};
const decrypt = (hash) => {

  const text = hash.slice(0, hash.length-6) 
  const data = text.slice(6, text.length) 

  //console.log('data', data)
  return window.atob(data)
};

export { encrypt, decrypt };
