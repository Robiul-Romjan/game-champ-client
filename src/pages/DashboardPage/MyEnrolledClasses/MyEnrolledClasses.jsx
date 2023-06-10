

const MyEnrolledClasses = () => {
    return (
        <div className="w-full mt-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">My Enrolled Classes</h2>
            <div className="flex items-center justify-center gap-2">
                <div className="h-1 w-36 bg-[#4021a5]"></div>
                <span className="text-red-500 font-semibold">Enrolled Class</span>
                <div className="h-1 w-36 bg-[#4021a5]"></div>
            </div>
            
        </div>
    );
};

export default MyEnrolledClasses;