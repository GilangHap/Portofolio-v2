async function fetchSchema() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const res = await fetch(`${url}/rest/v1/?apikey=${key}`);
  const data = await res.json();
  console.log("Tables:", Object.keys(data.definitions || {}));
}
fetchSchema();
