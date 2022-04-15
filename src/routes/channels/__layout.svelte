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

<main class="container max-w-xl">
    <div class="flex h-screen">
        <ul class="bg-gray-800 text-white w-40 p-8">
            {#each channels as channel}
                <li>
                    <a class="" href="/channels/{channel.id}">
                        <span class="text-gray-600">#</span>
                        {channel.title}</a
                    >
                </li>
            {/each}
        </ul>
        <div class="flex-1 p-8 flex flex-col">
            <slot />
        </div>
    </div>
</main>
