import { supabase } from './lib/supabase'

async function test() {
  const { data, error } = await supabase.from('Project').insert([{ title: "test-columns" }]).select();
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Inserted:", data[0]);
    await supabase.from('Project').delete().eq('id', data[0].id);
  }
}
test();
