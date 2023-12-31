import { useQuery } from "@tanstack/react-query";


const PopularClass = () => {

    const { data: popularClasses = [] } = useQuery(["popular-classes"], async () => {
        const res = await fetch("https://assignment-12-server-ivory.vercel.app/popular-classes")
        return res.json();
    });

    return (
        <div className="mt-20 md:mt-24">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">Our Popular Classes</h2>
            <div className="flex items-center justify-center gap-2"> 
                <div className="h-1 w-36 bg-[#4021a5]"></div>
                <span className="text-red-500 font-semibold">Popular</span>
                <div className="h-1 w-36 bg-[#4021a5]"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
                {
                    popularClasses.map((popular) => <div className="shadow-lg p-4 rounded border-[#4021a5] border-y-2" key={popular._id} data-aos="flip-up"  data-aos-duration="1000">
                        <img className="rounded" src={popular.image} alt="" />
                        <div className="mt-4">
                            <h4 className="text-xl font-semibold">{popular.class_name}</h4>
                            <p><span className="font-semibold">Instructor:</span> {popular.instructor_name}</p>
                            <p><span className="font-semibold">Price:</span><span> ${popular.price}</span></p>
                            <p><span className="font-semibold">Enrolled Student:</span> <span>{popular.enrolled} students</span></p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default PopularClass;