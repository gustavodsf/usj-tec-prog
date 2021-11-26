<script>
    import Button from '../component/Button.svelte';
    import Input from '../component/Input.svelte';
    import Link from '../component/Link.svelte';
    
    import {userbaseStore, userStore, promiseStore} from '../stores';

    let username, password;

    function signin() {
       
    }
</script>

<form on:submit|preventDefault={signin} class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">

</form>