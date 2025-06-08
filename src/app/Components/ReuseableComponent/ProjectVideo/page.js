function ProjectVideo() {
  return (
    <>
      <div className="max-w-screen min-h-screen flex justify-center items-center bg-black flex-col">
        <div className="text-3xl font-bold text-white ">700 Form</div>
        <video
          src="/img/form.mp4"
          className="w-[40rem] h-[40rem]"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </>
  );
}
export default ProjectVideo;
