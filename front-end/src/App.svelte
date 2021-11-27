<script>
	import { onMount } from "svelte";
	import { apiData, userNames } from './store.js';
	import { toasts, ToastContainer, FlatToast, BootstrapToast }  from "svelte-toasts";
	import MyForm from './page/Form.svelte'


	let loading = true;




	const handleGetUsers = ()  => {
		fetch("http://localhost:3000/user")
		.then(response => response.json())
		.then(data => {
			loading = false;
			console.log(data);
			apiData.set(data);
		}).catch(error => {
			loading = false;
			console.log(error);
			return [];
		});
	}

	onMount(async () => {
		handleGetUsers();
	});
</script>

<main>
	<ToastContainer placement="bottom-right" let:data={data}>
    <FlatToast {data} /> <!-- Provider template for your toasts -->
  </ToastContainer>


	<MyForm />

	<h1>UniSãoJosé usuários</h1>
	{#if loading  }
		<p> loading..... </p>
	{/if}	
	<ul>
		{#each $userNames as userName}
			<li>{userName}</li>
		{/each}
	</ul>
</main>

<style>

</style>