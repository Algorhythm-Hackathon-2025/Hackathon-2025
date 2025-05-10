const UB_IMG =
  "https://media.istockphoto.com/id/1651845205/photo/drone-photo-of-ulaanbaatar-skyline-mongolia.jpg?s=1024x1024&w=is&k=20&c=18iILf7a07N8zIkt8Q9Pn8w-gDGtH3iti-zxp1h3Pw8=";

export default function Home() {
  return (
    <>
      <div className="w-screen bg-white">
        <img src={UB_IMG} className="w-full object-cover"></img>
      </div>
    </>
  );
}
