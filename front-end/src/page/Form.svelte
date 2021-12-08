<script>
  
  let name;
	let email;
	let password;
	let role;



	const isValid = (e) => {
		if ( name == undefined || name == ""){
			toasts.add({
				title: 'Erro!',
				description: 'Nome é um campo obrigatório',
				duration: 10000,
				theme: 'dark',
				placement: 'top-right',
				type: 'error',
				onClick: () => {},
				onRemove: () => {},
			});
			return false;
		}

		if(name.length < 3){
			toasts.add({
				title: 'Erro!',
				description: 'Nome deve possuir tamanho superior a 3 caracteres.',
				duration: 10000,
				theme: 'dark',
				placement: 'top-right',
				type: 'error',
				onClick: () => {},
				onRemove: () => {},
			});
			return false;
		} 
		return true;
	}

	const handleSubmit = async (e) => {
		loading = true;
		if ( !isValid(e) ){
			return;
		}

		e.preventDefault();
		const data = {
			name,
			email,
			password,
			role
		};
		const response = await fetch('http://localhost:3000/user', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
	      'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(res => res.json())
		.then(() => {
			loading = false;

			handleGetUsers();
			
			name="";
			email="";
			password="";
			role="";
			
			toasts.add({
				title: 'Sucesso!',
				description: 'Usuário Cadastrado com sucesso!',
				duration: 10000,
				placement: 'top-right',
				type: 'success',
			});
		});
	}

</script>

<div class="container">
	<div class="left">
	  <div class="header">
		<h2 class="animation a1">RPG</h2>
		<h4 class="animation a2">Registre num mundo de aventuras agora!!!</h4>
	  </div>
	  <div class="form">
		<input type="name" bind:value={name} class="form-field animation a3" placeholder="Digite seu nome">
		<input type="email"bind:value={email}  class="form-field animation a4" placeholder="Digite seu e-mail">
		<input type="password"bind:value={password}  class="form-field animation a5" placeholder="Digite sua Senha">
		<input name="role" bind:value={role} class="form-field animation a5"  placeholder="Digite sua classe">
		<p class="animation a5"><a href="#">Forgot Password</a></p>
		<button class="animation a6" on:click={handleSubmit}>REGISTRAR</button>
	  </div>
	</div>
	<div class="right"></div>
  </div>  
<style>
* { box-sizing: border-box; }
@import url('https://fonts.googleapis.com/css?family=Rubik:400,500&display=swap');


body {
  font-family: 'Rubik', sans-serif;
}

.container {
  display: flex;
  height: 100vh;
}

.left {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  animation-name: left;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-delay: 1s;
}

.right {
  flex: 1;
  background-color: black;
  transition: 1s;
  background-image: url(https://ogimg.infoglobo.com.br/in/24798511-20a-1e5/FT1500A/690/nerdcast-rpg-cthulhu.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}



.header > h2 {
  margin: 0;
  color: #4f46a5;
}

.header > h4 {
  margin-top: 10px;
  font-weight: normal;
  font-size: 15px;
  color: rgba(0,0,0,.4);
}

.form {
  max-width: 80%;
  display: flex;
  flex-direction: column;
}

.form > p {
  text-align: right;
}

.form > p > a {
  color: #000;
  font-size: 14px;
}

.form-field {
  height: 46px;
  padding: 0 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-family: 'Rubik', sans-serif;
  outline: 0;
  transition: .2s;
  margin-top: 20px;
}

.form-field:focus {
  border-color: #0f7ef1;
}

.form > button {
  padding: 12px 10px;
  border: 0;
  background: linear-gradient(to right, #de48b5 0%,#0097ff 100%); 
  border-radius: 3px;
  margin-top: 10px;
  color: #fff;
  letter-spacing: 1px;
  font-family: 'Rubik', sans-serif;
}

.animation {
  animation-name: move;
  animation-duration: .4s;
  animation-fill-mode: both;
  animation-delay: 2s;
}

.a1 {
  animation-delay: 2s;
}

.a2 {
  animation-delay: 2.1s;
}

.a3 {
  animation-delay: 2.2s;
}

.a4 {
  animation-delay: 2.3s;
}

.a5 {
  animation-delay: 2.4s;
}

.a6 {
  animation-delay: 2.5s;
}

@keyframes move {
  0% {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-40px);
  }

  100% {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

@keyframes left {
  0% {
    opacity: 0;
    width: 0;
  }

  100% {
    opacity: 1;
    padding: 20px 40px;
    width: 440px;
  }
}
</style>