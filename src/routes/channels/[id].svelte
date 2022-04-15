<script context="module">
    import supabase from '$lib/utils/supabase'

    export async function load({ params: { id } }) {
        const { data: channel, error } = await supabase
            .from('channels')
            .select('title, description, id, messages(id, content)')
            .match({ id })
            .single()

        if (error) {
            console.log(error)
        }
        return {
            props: {
                channel,
            },
        }
    }
</script>

<script>
    export let channel

    $: messages = channel.messages

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

<div>
    <pre class="">{JSON.stringify(channel, null, 2)}</pre>

    {#each messages as message}
        <p>{message.content}</p>
    {/each}

    <form on:submit|preventDefault={handleSubmit} class="mt-6" action="">
        <div class="flex gap-2">
            <input class="bg-zinc-700 px-2" type="text" name="content" id="" />
            <button
                type="submit"
                class="bg-green-600 hover:bg-green-700 text-white rounded p-2"
                >Send</button
            >
        </div>
    </form>
</div>
