import channels from '$lib/data/channels.json'

export async function get() {
    const data = { channels }

    return {
        body: await data,
    }
}
