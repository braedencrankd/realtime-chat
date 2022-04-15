<script context="module">
    import supabase from '$lib/utils/supabase'
    import { onMount } from 'svelte';

    export async function load({ params: { id } }) {
        const { data: channel, error } = await supabase
            .from('channels')
            .select('title, description, id, messages(id, content)')
            .match({ id })
            .single()

        if (error) {
            console.log(error)
        }

        // subscribe to messages that change in supabase per channel
        const messages = writable(channel.messages);

        supabase.from(`messages:channel_id=eq.${channel.id }`)
            .on('*', (payload) => {
                messages.update((messages) => [...messages, {id: payload.new.id, content: payload.new.content}])
        }).subscribe();

        return {
            props: {
                channel,
                messages
            },
        }
    }
</script>

<script>
    import { writable } from 'svelte/store';
    import {page} from '$app/stores';


    export let channel
    export let messages


    async function handleSubmit(e) {
        const formData = new FormData(e.target)
        const content = formData.get('content')

        const { data, error } = await supabase
            .from('messages')
            .insert({ content, channel_id: channel.id })

        if (error) {
            console.log(error.message)
        }
    }
</script>

    <h1 class="text-2xl font-bold mb-2">{channel.title}</h1>
    <p class="text-gray-600 border-b-2 pb-6">{channel.description}</p>

    <div class="flex-1 flex flex-col p-2">
        <div class="mt-auto">
            {#each $messages as message}
                <p class="p-2">{message.content}</p>
            {/each}
        </div>
    </div>

    <form on:submit|preventDefault={handleSubmit} class="mt-6" action="">
        <div class="flex gap-2">
            <input class="flex-1 border-2 rounded px-2 overflow-auto" type="text" name="content" id="" />
            <button
                type="submit"
                class="bg-red-400 hover:bg-red-500 px-4 py-2 text-white rounded shadow"
                >Send</button
            >
        </div>
    </form>
