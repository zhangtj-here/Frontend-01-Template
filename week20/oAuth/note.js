let url = "https://github.com/login/oauth/authorize?client_id=Iv1.d701c8e273b50c11&redirect_uri=http%3A%2F%2Flocalhost%3A8000&scope=read%3Auser&state=123abc"

{
  let code = "16a10e368013bd3cdc2f";
  let state = "abc123";
  let client_secret = "1c18e58ebb59798ccfb7b65756f85cfe6e350437";
  let client_id = "Iv1.d701c8e273b50c11";
  let redirect_uri = encodeURIComponent("http://localhost:8000");
  
  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;
  
  let xhr =  new XMLHttpRequest;
  
  xhr.open("POST",  `https://github.com/login/oauth/access_token?${params}`, true);
  xhr.send(null);
  
  xhr.addEventListener("readystatechange", function(event) {
      if (xhr.readyState === 4) {
        console.log(xhr.responseText);
      }
  })
}

{

  let xhr =  new XMLHttpRequest;

  xhr.open("GET",  `https://api.github.com/user`, true);
  xhr.setRequestHeader("Authorization", "token ae6df106d98546eaa793f6170c625e7ed744be73");
  xhr.send(null);

  xhr.addEventListener("readystatechange", function(event) {
      if (xhr.readyState === 4) {
        console.log(xhr.responseText);
      }
  })
}


