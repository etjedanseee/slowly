import supabase from "../supabaseClient"

export const readLetter = async (id: string) => {
  try {
    const { error } = await supabase.from('Messages')
      .update({ isRead: true })
      .eq('id', id);

    if (error) {
      throw new Error(error.message)
    }
  } catch (e) {
    console.log('set isRead error', e)
  }
}