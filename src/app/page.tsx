import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-5xl">Тестовое задание</h1>
      <Link className="text-2xl" href={'/admin'}>Админ</Link>
      <Link className="text-2xl" href={'/schedule'}>Расписание</Link>
    </div>
  )
}
