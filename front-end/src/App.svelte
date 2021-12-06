<main>
	<ToastContainer placement="bottom-right" let:data={data}>
    <FlatToast {data} /> <!-- Provider template for your toasts -->
  </ToastContainer>

	{#if loading  }
		<p> loading..... </p>
	{/if}
	<MyForm />	
<!--	<ul>
		{#each $userNames as userName}
			<li>{userName}</li>
		{/each}
	</ul>-->
</main>
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

<style>
</style>