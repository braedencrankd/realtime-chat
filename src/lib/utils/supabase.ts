import { createClient } from '@supabase/supabase-js'
import { get } from 'svelte/store'
import { getStores, session } from '$app/stores'
import { browser } from '$app/env'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPBASE_PUBLIC_KEY

export default createClient(supabaseUrl, supabaseKey)
