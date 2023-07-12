import supabase from "../supabaseClient"

export const readLetter = async (id: string) => {
  try {
    const { data, error } = await supabase.from('Messages')
      .update({ isRead: true })
      .eq('id', id);

    if (error) {
      throw new Error(error.message)
    }
    console.log('work', data)
  } catch (e) {
    console.log('set isRead error', e)
  }
}