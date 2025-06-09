'use client'
export const ProjectCard = ({ title, description, imgUrl }) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 mb-10">
      <div className="relative rounded-3xl overflow-hidden group shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#AA367C] to-[#4A2FBD] opacity-0 group-hover:opacity-95 transition duration-500 flex items-center justify-center text-white text-center p-6">
          <div>
            <h4 className="text-3xl font-extrabold mb-4">{title}</h4>
            <span className="italic text-lg">{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
