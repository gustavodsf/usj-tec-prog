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

<div id="meuForm">
  <label for="name">Nome</label>
  <input name="name" bind:value={name}>

  <label for="email">E-mail</label>
  <input name="email" bind:value={email}>

  <label for="password">Senha</label>
  <input name="password" type="password" bind:value={password}>

  <label for="role">Perfil</label>
  <input name="role" bind:value={role}>

  <button on:click={handleSubmit}> Enviar </button>
</div>