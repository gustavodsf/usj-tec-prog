<script>
	import Tailwindcss from './Tailwindcss.svelte';

	import Router from 'svelte-spa-router';

	import SignUp from './pages/SignUp.svelte';
    import SignIn from './pages/SignIn.svelte';
    import ForgotPassword from './pages/ForgotPassword.svelte';

	import {userbaseStore, userStore, promiseStore} from './stores';

</script>

<Tailwindcss />


<div class="container flex flex-col justify-center items-center w-screen h-screen mx-auto">
    {#await $promiseStore.then(() => Promise.reject())}
        Loading..
    {:catch error}
        {#if error}
            <strong class="text-red-700 font-bold">ERROR! {error} </strong>
        {/if}
        {#if $userStore}
            Hello, {$userStore.username}!
            <button on:click={signout}>Logout</button>
        {:else}
            <h1>Welcome to THE BEST WAY TO learn Svelte</h1>
            <Router routes={{
                '/': SignUp,
                '/signin': SignIn,
                '/forgotpassword': ForgotPassword
            }} />
        {/if}
    {/await}
</div>