import supabase from "../supabaseClient"

export const sendLetter = async (senderId: string, receiverId: string, message: string, deliveryTime: number) => {
  const createdAt = new Date()
  const deliveredDate = new Date(+createdAt + (deliveryTime * 60000))

  try {
    const { error } = await supabase.from('Messages').insert([{
      senderId,
      receiverId,
      message,
      createdAt,
      deliveredDate,
      isRead: false
    }])

    if (error) {
      throw new Error(error.message)
    }

  } catch (e) {
    console.log('Send letter sb error:', e)
  }
}