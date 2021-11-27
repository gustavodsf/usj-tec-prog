import { writable, derived } from 'svelte/store';

export const apiData = writable([]);


export const userNames = derived(apiData, ($apiData) => {
  if ($apiData.length > 0){
    return $apiData.map(user => `N:${user.name} | E:${user.email}`);
  }
  return [];
});