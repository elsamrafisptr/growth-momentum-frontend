import Link from "next/link";
import React from "react";

const Feedback = () => {
  return (
    <div className="flex h-full min-h-screen w-full flex-col gap-6 px-5 md:px-12">
      <h1 className="mt-24 text-justify md:mt-12">
        Selamat Datang di Growth Momentum ID, ini adalah website platform
        pembelajaran digital dari dataset{" "}
        <Link
          href={
            "https://www.kaggle.com/datasets/khaledatef1/online-courses/data"
          }
          target="_blank"
          className="underline underline-offset-2"
        >
          Online Courses
        </Link>{" "}
        yang berasal dari kaggle.com.
      </h1>
      <strong>Tutorial</strong>
      <ul className="-mt-4">
        <li>
          1. Mengisi form preferensi pada awal masuk ke website tadi sebelum
          bisa membaca ini.
        </li>
        <li>
          2. Menuju ke halaman{" "}
          <Link
            href={"/dashboard"}
            className="text-blue-500 underline underline-offset-2"
          >
            dashboard
          </Link>
          .
        </li>
        <li>
          3. Melihat dan mengamati rekomendasi pembelajaran digital yang sudah
          disesuaikan dengan referensi anda.
        </li>
        <li>
          4. Ketika sudah cukup mengamati, maka isi form responden pada{" "}
          <Link
            href={"https://forms.gle/Y9YxNyagTSftUk3x7"}
            target="_blank"
            className="text-blue-500 underline underline-offset-2"
          >
            tautan ini
          </Link>
          .
        </li>
        <li>5. Terimakasih atas bantuannya.</li>
      </ul>
    </div>
  );
};

export default Feedback;
