<script context="module">
    import supabase from '$lib/utils/supabase'

    export async function load({ fetch }) {
        const { data: channels, error } = await supabase
            .from('channels')
            .select('id, title')

        if (error) {
            console.log(error.message)
        }

        return {
            props: {
                channels,
            },
        }
    }
</script>

<script lang="ts">
    export let channels
</script>

<main class="container m-12 max-w-xl ">
    <h1 class="text-4xl font-black mb-4">Channels</h1>
    <ul class="mb-12">
        {#each channels as channel}
            <li>
                <a
                    class="font-bold text-green-400 hover:text-green-500 "
                    href="/channels/{channel.id}">{channel.title}</a
                >
            </li>
        {/each}
    </ul>
    <slot />
</main>
