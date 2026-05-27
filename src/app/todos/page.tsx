import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <ul className="p-8 space-y-2 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      {todos?.map((todo: any) => (
        <li key={todo.id} className="list-disc list-inside">
          {todo.name}
        </li>
      ))}
      {!todos?.length && <p className="text-gray-400">No todos found.</p>}
    </ul>
  )
}
