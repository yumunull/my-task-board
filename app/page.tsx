import Image from "next/image";
import TaskBoard from "@/app/_components/TaskBoard";

export default function Home() {
  return (
      <div className={`min-h-screen min-w-screen flex flex-col justify-center items-center`}>
        <TaskBoard/>
      </div>
  );
}
